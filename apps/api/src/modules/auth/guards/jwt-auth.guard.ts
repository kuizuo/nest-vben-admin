import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { FastifyReply, FastifyRequest } from 'fastify';
import { isEmpty, isNil } from 'lodash';

import { ErrorEnum } from '@/constants/error';
import { ApiException } from '@/exceptions/api.exception';
import { AuthService } from '@/modules/auth/auth.service';
import { TokenService } from '@/modules/auth/services/token.service';

import { AuthStrategy, IS_PUBLIC_KEY } from '../constants';

/**
 * Authentication 登录校验
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthStrategy.JWT) {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private tokenService: TokenService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    // 检测是否是开放类型的，例如获取验证码类型的接口不需要校验，可以加入@Public可自动放过
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const response = context.switchToHttp().getResponse<FastifyReply>();

    let requestToken = request.headers.authorization?.replace('Bearer ', '');

    let result: any = false;
    try {
      result = await super.canActivate(context);
    } catch (e) {
      if (isPublic) {
        return true;
      }

      if (isEmpty(requestToken)) {
        throw new ApiException(ErrorEnum.CODE_1101);
      }

      // 判断token是否存在,如果不存在则认证失败
      const accessToken = isNil(requestToken)
        ? undefined
        : await this.tokenService.checkAccessToken(requestToken!);
      if (!accessToken) throw new ApiException(ErrorEnum.CODE_1101);

      // 无法通过token校验
      // 尝试通过refreshToken刷新token

      if (!isNil(requestToken)) {
        const token = await this.tokenService.refreshToken(accessToken);
        if (isNil(token)) throw new ApiException(ErrorEnum.CODE_1101);

        if (token.accessToken) {
          // 将新的token挂载到当前请求上
          requestToken = token.accessToken;

          response.header('new-token', token.accessToken);
        }

        try {
          // 刷新失败(refreshToken过期)则再次抛出认证失败的异常
          result = await super.canActivate(context);
        } catch (error) {
          throw new ApiException(ErrorEnum.CODE_1102);
        }
      }
    }

    if (isPublic) return true;

    if (isEmpty(request.user)) {
      throw new ApiException(ErrorEnum.CODE_1101);
    }

    const pv = await this.authService.getRedisPasswordVersionById(
      request.user.uid,
    );
    if (pv !== `${request.user.pv}`) {
      // 密码版本不一致，登录期间已更改过密码
      throw new ApiException(ErrorEnum.CODE_1102);
    }

    // 允许多端登录
    const cacheToken = await this.authService.getRedisTokenById(
      request.user.uid,
    );
    if (requestToken !== cacheToken) {
      // 与redis保存不一致 即二次登录
      throw new ApiException(ErrorEnum.CODE_1106);
    }

    return result;
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err;
    }
    return user;
  }
}
