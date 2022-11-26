import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { isEmpty } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { ApiException } from '@/common/exceptions/api.exception';
import { SYS_API_TOKEN } from '@/common/constants/param-config';
import { LoginService } from '@/modules/admin/login/login.service';
import { SysParamConfigService } from '@/modules/admin/system/param-config/param-config.service';
import { ErrorEnum } from '../constants/error';
import {
  SKIP_AUTH_DECORATOR_KEY,
  API_TOKEN_DECORATOR_KEY,
  ALLOW_ANON_PERMISSION_DECORATOR_KEY,
} from '/@/common/decorators';

/**
 * admin perm check guard
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private loginService: LoginService,
    private paramConfigService: SysParamConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 检测是否是开放类型的，例如获取验证码类型的接口不需要校验，可以加入@SkipAuth可自动放过
    const isSkipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_DECORATOR_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isSkipAuth) return true;

    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const token = request.headers['authorization']?.replace('Bearer ', '');
    if (isEmpty(token)) {
      throw new ApiException(ErrorEnum.CODE_1101);
    }

    // 检查是否开启API TOKEN授权，当开启时，只有带API TOKEN可以正常访问
    const apiToken = this.reflector.getAllAndOverride<boolean>(API_TOKEN_DECORATOR_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (apiToken) {
      const result = await this.paramConfigService.findValueByKey(SYS_API_TOKEN);
      if (token === result) {
        return true;
      } else {
        throw new ApiException(ErrorEnum.CODE_1103);
      }
    }

    try {
      // 挂载对象到当前请求上
      request.authUser = this.jwtService.verify(token);
    } catch (e) {
      // 无法通过token校验
      throw new ApiException(ErrorEnum.CODE_1101);
    }
    if (isEmpty(request.authUser)) {
      throw new ApiException(ErrorEnum.CODE_1101);
    }
    const pv = await this.loginService.getRedisPasswordVersionById(request.authUser.uid);
    if (pv !== `${request.authUser.pv}`) {
      // 密码版本不一致，登录期间已更改过密码
      throw new ApiException(ErrorEnum.CODE_1102);
    }
    const redisToken = await this.loginService.getRedisTokenById(request.authUser.uid);
    if (token !== redisToken) {
      // 与redis保存不一致
      throw new ApiException(ErrorEnum.CODE_1102);
    }
    // 注册该注解，Api则放行检测
    const notNeedPerm = this.reflector.get<boolean>(
      ALLOW_ANON_PERMISSION_DECORATOR_KEY,
      context.getHandler(),
    );
    // Token校验身份通过，判断是否需要权限的url，不需要权限则pass
    if (notNeedPerm) {
      return true;
    }
    const perms: string = await this.loginService.getRedisPermsById(request.authUser.uid);
    // 安全判空
    if (isEmpty(perms)) {
      throw new ApiException(ErrorEnum.CODE_1101);
    }
    // 将sys:admin:user等转换成sys/admin/user
    const permArray: string[] = (JSON.parse(perms) as string[]).map((e) => e.replace(/:/g, '/'));
    const path = request.routerPath;

    // 遍历权限是否包含该url，不包含则无访问权限
    if (!permArray.includes(path.replace(`/${process.env.PREFIX}/`, ''))) {
      throw new ApiException(ErrorEnum.CODE_1103);
    }
    // pass
    return true;
  }
}
