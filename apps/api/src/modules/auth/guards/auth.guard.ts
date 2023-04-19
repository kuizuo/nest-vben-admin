import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { isEmpty, isNil } from 'lodash';

import { ErrorEnum } from '@/constants/error';
import { SKIP_AUTH_DECORATOR_KEY } from '@/decorators';
import { ApiException } from '@/exceptions/api.exception';
import { AuthService } from '@/modules/auth/auth.service';
import { TokenService } from '@/modules/auth/services/token.service';

/**
 * Authentication 登录校验
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private tokenService: TokenService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 检测是否是开放类型的，例如获取验证码类型的接口不需要校验，可以加入@SkipAuth可自动放过
    const isSkipAuth = this.reflector.getAllAndOverride<boolean>(
      SKIP_AUTH_DECORATOR_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const response = context.switchToHttp().getResponse<FastifyReply>();

    let requestToken = request.headers.authorization?.replace('Bearer ', '');

    try {
      // 挂载对象到当前请求上
      request.authUser = this.jwtService.verify(requestToken);
    } catch (e) {
      if (isSkipAuth) {
        return true;
      }

      if (isEmpty(requestToken)) {
        throw new ApiException(ErrorEnum.CODE_1101);
      }

      const flag = await this.tokenService.checkAccessToken(requestToken);
      if (!flag) throw new ApiException(ErrorEnum.CODE_1101);

      // 无法通过token校验
      // 尝试通过refreshToken刷新token

      if (!isNil(requestToken)) {
        const token = await this.tokenService.refreshToken(requestToken);
        if (isNil(token)) throw new ApiException(ErrorEnum.CODE_1101);

        if (token.accessToken) {
          // 将新的token挂载到当前请求上
          requestToken = token.accessToken;

          response.header('new-token', token.accessToken);
        }

        try {
          // 刷新失败(refreshToken过期)则再次抛出认证失败的异常
          request.authUser = this.jwtService.verify(requestToken);
        } catch (error) {
          throw new ApiException(ErrorEnum.CODE_1102);
        }
      }
    }

    if (isSkipAuth) {
      return true;
    }

    if (isEmpty(request.authUser)) {
      throw new ApiException(ErrorEnum.CODE_1101);
    }

    const pv = await this.authService.getRedisPasswordVersionById(
      request.authUser.uid,
    );
    if (pv !== `${request.authUser.pv}`) {
      // 密码版本不一致，登录期间已更改过密码
      throw new ApiException(ErrorEnum.CODE_1102);
    }

    // 允许多端登录
    // const cacheToken = await this.authService.getRedisTokenById(request.authUser.uid);
    // if (requestToken !== cacheToken) {
    //   // 与redis保存不一致 即二次登录
    //   throw new ApiException(ErrorEnum.CODE_1106);
    // }

    return true;
  }
}
