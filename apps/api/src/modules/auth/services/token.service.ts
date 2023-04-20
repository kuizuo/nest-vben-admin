import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';

import { RedisService } from '@/modules/shared/redis/redis.service';
import { MenuService } from '@/modules/system/menu/menu.service';

import { RoleService } from '@/modules/system/role/role.service';
import { UserEntity } from '@/modules/system/user/entities/user.entity';

import { generateUUID } from '@/utils';

import { AccessTokenEntity } from '../entities/access-token.entity';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';

/**
 * 令牌服务
 */
@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private redisService: RedisService,
    private configService: ConfigService,
    private roleService: RoleService,
    private menuService: MenuService,
  ) {}

  /**
   * 根据accessToken刷新AccessToken与RefreshToken
   * @param accessTokenSign
   * @param response
   */
  async refreshToken(accessToken: AccessTokenEntity) {
    const { user, refreshToken } = accessToken;

    if (refreshToken) {
      const now = dayjs();
      // 判断refreshToken是否过期
      if (now.isAfter(refreshToken.expired_at)) return null;

      const roleIds = await this.roleService.getRoleIdByUser(user.id);
      const roleValues = await this.roleService.getRoleValues(roleIds);

      // 如果没过期则生成新的access_token和refresh_token
      const token = await this.generateAccessToken(user.id, roleValues);

      await accessToken.remove();
      return token;
    }
    return null;
  }

  async generateAccessToken(uid: number, roles: string[] = []) {
    const payload: IAuthUser = {
      uid,
      pv: 1,
      roles,
    };

    const jwtSign = this.jwtService.sign(payload);

    // 设置密码版本号 当密码修改时，版本号+1
    await this.redisService.client.set(`auth:passwordVersion:${uid}`, 1);

    // 设置菜单权限
    const perms = await this.menuService.getPerms(uid);

    await this.redisService.client.set(
      `auth:perms:${uid}`,
      JSON.stringify(perms),
    );

    // 生成accessToken
    const accessToken = new AccessTokenEntity();
    accessToken.value = jwtSign;
    accessToken.user = { id: uid } as UserEntity;
    accessToken.expired_at = dayjs()
      .add(this.configService.get<number>('jwt.expires'), 'second')
      .toDate();

    await accessToken.save();

    // 生成refreshToken
    const refreshToken = await this.generateRefreshToken(accessToken, dayjs());

    return {
      accessToken: jwtSign,
      refreshToken,
    };
  }

  /**
   * 生成新的RefreshToken并存入数据库
   * @param accessToken
   * @param now
   */
  async generateRefreshToken(
    accessToken: AccessTokenEntity,
    now: dayjs.Dayjs,
  ): Promise<string> {
    const refreshTokenPayload = {
      uuid: generateUUID(),
    };

    const refreshTokenSign = this.jwtService.sign(refreshTokenPayload, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
    });

    const refreshToken = new RefreshTokenEntity();
    refreshToken.value = refreshTokenSign;
    refreshToken.expired_at = now
      .add(this.configService.get<number>('jwt.refreshExpires'), 'second')
      .toDate();
    refreshToken.accessToken = accessToken;

    await refreshToken.save();

    return refreshTokenSign;
  }

  /**
   * 检查accessToken是否存在
   * @param value
   */
  async checkAccessToken(value: string) {
    return AccessTokenEntity.findOne({
      where: { value },
      relations: ['user', 'refreshToken'],
      cache: true,
    });
  }

  /**
   * 移除AccessToken且自动移除关联的RefreshToken
   * @param value
   */
  async removeAccessToken(value: string) {
    const accessToken = await AccessTokenEntity.findOne({
      where: { value },
    });
    if (accessToken) await accessToken.remove();
  }

  /**
   * 移除RefreshToken
   * @param value
   */
  async removeRefreshToken(value: string) {
    const refreshToken = await RefreshTokenEntity.findOne({
      where: { value },
      relations: ['accessToken'],
    });
    if (refreshToken) {
      if (refreshToken.accessToken) await refreshToken.accessToken.remove();
      await refreshToken.remove();
    }
  }

  /**
   * 验证Token是否正确,如果正确则返回所属用户对象
   * @param token
   */
  async verifyAccessToken(token: string) {
    const result = this.jwtService.verify(token);
    if (!result) return false;

    return true;
  }
}
