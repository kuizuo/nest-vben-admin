import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';

import { DataSource } from 'typeorm';

import { ErrorEnum } from '@/constants/error';
import { ApiException } from '@/exceptions/api.exception';
import { AuthService } from '@/modules/auth/auth.service';

import { IS_PUBLIC_KEY } from '../../auth/constants';

import { ALLOW_ANON_KEY, PERMISSION_KEY } from '../constant';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private dataSource: DataSource,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const { user } = request;

    if (!user) return false;

    const allowAnon = this.reflector.get<boolean>(
      ALLOW_ANON_KEY,
      context.getHandler(),
    );
    // Token校验身份通过，判断是否需要权限的url，不需要权限则pass
    if (allowAnon) return true;

    const payloadPermission = this.reflector.getAllAndOverride<
      string | string[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);

    let allPermissions = await this.authService.getPermissionsByUid(user.uid);

    if (!allPermissions) {
      const res = await this.authService.getPermissions(user.uid);

      allPermissions = res;

      // set permissions into cache
      await this.authService.setPermissions(user.uid, allPermissions);
    }

    // 如果没有设置接口权限，则默认通过
    // if (isEmpty(payloadPermission)) return true;

    let canNext = false;

    // handle permission strings
    if (Array.isArray(payloadPermission)) {
      // 只要有一个权限满足即可
      canNext = payloadPermission.every((i) => allPermissions.includes(i));
    }

    if (typeof payloadPermission === 'string') {
      canNext = allPermissions.includes(payloadPermission);
    }

    if (!canNext) {
      throw new ApiException(ErrorEnum.CODE_1103);
    }

    return true;
  }
}
