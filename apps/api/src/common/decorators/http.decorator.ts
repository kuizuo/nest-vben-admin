import type { ExecutionContext } from '@nestjs/common'

import { createParamDecorator } from '@nestjs/common'
import type { FastifyRequest } from 'fastify'

/**
 * 快速获取IP
 */
export const Ip = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<FastifyRequest>()

  return (
    // 判断是否有反向代理 IP
    (
      (request.headers['x-forwarded-for'] as string)
      // 判断后端的 socket 的 IP
      || request.socket.remoteAddress
    ).replace('::ffff:', '')
  )
})

/**
 * 快速获取request path，并不包括url params
 */
export const Uri = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<FastifyRequest>()
  return request.routerPath
})
