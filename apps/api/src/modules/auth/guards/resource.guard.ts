import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { FastifyRequest } from 'fastify'

import { isNil } from 'lodash'

import { DataSource, Repository } from 'typeorm'

import { BusinessException } from '~/common/exceptions/biz.exception'

import { ErrorEnum } from '~/constants/error-code.constant'

import { IS_PUBLIC_KEY, POLICY_KEY, Roles } from '../constant'
import { ResourceObject } from '../decorators/resource.decorator'

@Injectable()
export class ResourceGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic)
      return true

    const request = context.switchToHttp().getRequest<FastifyRequest>()

    const { user } = request

    if (!user)
      return false

    // 如果是检查资源所属，且不是超级管理员，还需要进一步判断是否是自己的数据
    const { entity, condition } = this.reflector.get<ResourceObject>(
      POLICY_KEY,
      context.getHandler(),
    ) ?? { entity: null, condition: null }

    if (entity && !user.roles.includes(Roles.ADMIN)) {
      const repo: Repository<any> = this.dataSource.getRepository(entity)

      /**
       * 获取请求中的items,item,id,用于crud操作时验证数据
       * @param request
       */
      const getRequestItemId = (request?: FastifyRequest): number => {
        const { params = {}, body = {}, query = {} } = (request ?? {}) as any
        const id = params.id ?? body.id ?? query.id

        if (!isNil(id))
          return Number(id)

        return null
      }

      const id = getRequestItemId(request)
      if (!id)
        throw new BusinessException(ErrorEnum.REQUESTED_RESOURCE_NOT_FOUND)

      const item = await repo.findOne({ where: { id }, relations: ['user'] })
      if (!item)
        throw new BusinessException(ErrorEnum.REQUESTED_RESOURCE_NOT_FOUND)

      if (!item?.user)
        throw new BusinessException(ErrorEnum.USER_NOT_FOUND)

      if (condition)
        return condition(item, user)

      // 如果没有设置policy，则默认只能操作自己的数据
      if (item.user?.id !== user.uid)
        throw new BusinessException(ErrorEnum.REQUESTED_RESOURCE_NOT_FOUND)
    }

    return true
  }
}
