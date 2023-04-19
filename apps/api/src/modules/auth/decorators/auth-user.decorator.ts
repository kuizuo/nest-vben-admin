import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { IAuthUser } from '@/interfaces/auth';

type Payload = keyof IAuthUser;

/**
 * @description 获取当前登录用户信息, 并挂载到request上
 */
export const AuthUser = createParamDecorator(
  (data: Payload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();
    // auth guard will mount this
    const user = request.authUser as IAuthUser;

    return data ? user?.[data] : user;
  },
);
