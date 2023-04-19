import { Injectable } from '@nestjs/common';

import { isEmpty } from 'lodash';

import { ErrorEnum } from '@/constants/error';
import { ApiException } from '@/exceptions/api.exception';

import { RedisService } from '@/modules/shared/redis/redis.service';
import { UserService } from '@/modules/system/user/user.service';

import { MD5 } from '@/utils';

import { LoginLogService } from '../system/log/services/login-log.service';
import { MenuService } from '../system/menu/menu.service';
import { RoleService } from '../system/role/role.service';

import { TokenService } from './services/token.service';

@Injectable()
export class AuthService {
  constructor(
    private redisService: RedisService,
    private menuService: MenuService,
    private roleService: RoleService,
    private userService: UserService,
    private loginLogService: LoginLogService,
    private tokenService: TokenService,
  ) {}

  /**
   * 获取登录JWT
   * 返回null则账号密码有误，不存在该用户
   */
  async getLoginSign(
    username: string,
    password: string,
    ip: string,
    ua: string,
  ): Promise<string> {
    const user = await this.userService.findUserByUserName(username);
    if (isEmpty(user)) {
      throw new ApiException(ErrorEnum.CODE_1003);
    }

    const comparePassword = MD5(`${password}${user.psalt}`);
    if (user.password !== comparePassword) {
      throw new ApiException(ErrorEnum.CODE_1003);
    }

    const roleIds = await this.roleService.getRoleIdByUser(user.id);
    // 是管理员才允许登录
    if (!(roleIds.includes(1) || roleIds.includes(2))) {
      throw new ApiException(ErrorEnum.CODE_1104);
    }

    const roles = await this.roleService.getRoleValues(roleIds);

    const token = await this.tokenService.generateAccessToken(user.id, roles);
    await this.loginLogService.create(user.id, ip, ua);

    return token.accessToken;
  }

  /**
   * 效验账号密码
   */
  async checkPassword(username: string, password: string) {
    const user = await this.userService.findUserByUserName(username);

    const comparePassword = MD5(`${password}${user.psalt}`);
    if (user.password !== comparePassword) {
      throw new ApiException(ErrorEnum.CODE_1003);
    }
  }

  async loginLog(uid: number, ip: string, ua: string) {
    await this.loginLogService.create(uid, ip, ua);
  }

  async logout(uid: number) {
    // 删除token
    await this.userService.forbidden(uid);
  }

  /**
   * 重置密码
   */
  async resetPassword(username: string, password: string) {
    const user = await this.userService.findUserByUserName(username);

    await this.userService.forceUpdatePassword(user.id, password);
  }

  /**
   * 清除登录状态信息
   */
  async clearLoginStatus(uid: number): Promise<void> {
    await this.userService.forbidden(uid);
  }

  /**
   * 获取菜单列表
   */
  async getMenu(uid: number): Promise<string[]> {
    return this.menuService.getMenus(uid);
  }

  /**
   * 获取权限列表
   */
  async getPerm(uid: number): Promise<string[]> {
    return this.menuService.getPerms(uid);
  }

  async getRedisPasswordVersionById(id: number): Promise<string> {
    return this.redisService.client.get(`auth:passwordVersion:${id}`);
  }

  async getRedisTokenById(id: number): Promise<string> {
    return this.redisService.client.get(`auth:token:${id}`);
  }

  async getRedisPermsById(id: number): Promise<string> {
    return this.redisService.client.get(`auth:perms:${id}`);
  }
}
