import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';

import { IAuthUser } from '@/interfaces/auth';
import { RedisService } from '@/modules/shared/services/redis.service';
import { MenuService } from '@/modules/system/menu/menu.service';

/**
 * 令牌服务
 */
@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private redisService: RedisService,
    private config: ConfigService,
    private menuService: MenuService,
  ) {}

  /**
   * 根据accessToken刷新AccessToken与RefreshToken
   * @param accessToken
   * @param response
   */
  async refreshToken(accessToken: string) {
    // 通过accessToken获取refreshToken和用户信息
    const accessTokenJson = await this.redisService.client.get(
      `auth:access_token:${accessToken}`,
    );

    if (accessTokenJson) {
      const now = dayjs();
      const { refreshToken } = JSON.parse(accessTokenJson);
      const refreshTokenObj = (await this.jwtService.decode(
        refreshToken,
      )) as IAuthUser;

      // 判断refreshToken是否过期
      if (now.unix() > refreshTokenObj.exp) return null;

      const user = (await this.jwtService.decode(accessToken)) as IAuthUser;
      // 如果没过期则生成新的access_token和refresh_token
      const token = await this.generateAccessToken(user.uid, user?.roles);

      // 删除旧的access_token
      await this.redisService.client.del(`auth:access_token:${accessToken}`);
      // 删除旧的refresh_token
      await this.redisService.client.del(`auth:refresh_token:${refreshToken}`);

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

    // 生成refreshToken
    const refreshToken = await this.generateRefreshToken(jwtSign, dayjs());

    // 设置密码版本号 当密码修改时，版本号+1
    await this.redisService.client.set(`auth:passwordVersion:${uid}`, 1);

    // 设置用户id对应jwt
    await this.redisService.client.set(
      `auth:token:${uid}`,
      jwtSign,
      'EX',
      this.config.get<string>('jwt.expires'),
    );

    // 设置菜单权限
    const perms = await this.menuService.getPerms(uid);
    await this.redisService.client.set(
      `auth:perms:${uid}`,
      JSON.stringify(perms),
    );

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
    accessToken: string,
    now: dayjs.Dayjs,
  ): Promise<string> {
    const refreshTokenPayload = {
      accessToken,
      exp: now
        .add(this.config.get<number>('jwt.refreshExpires'), 'second')
        .unix(),
    };

    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      secret: this.config.get<string>('jwt.refreshSecret'),
    });

    // accessToken 与 refreshToken 一一对应 且与 refreshToken时间一样
    await this.redisService.client.set(
      `auth:access_token:${accessToken}`,
      JSON.stringify({
        refreshToken,
      }),
      'EX',
      this.config.get<number>('jwt.refreshExpires'),
    );

    await this.redisService.client.set(
      `auth:refresh_token:${refreshToken}`,
      JSON.stringify(refreshTokenPayload),
      'EX',
      this.config.get<number>('jwt.refreshExpires'),
    );

    return refreshToken;
  }

  /**
   * 检查accessToken是否存在
   * @param value
   */
  async checkAccessToken(value: string) {
    const accessToken = await this.redisService.client.get(
      `auth:access_token:${value}`,
    );
    return !!accessToken;
  }

  /**
   * 移除AccessToken且自动移除关联的RefreshToken
   * @param value
   */
  async removeAccessToken(value: string) {
    const accessToken = await this.redisService.client.get(
      `auth:access_token:${value}`,
    );

    if (accessToken) {
      const { refreshToken, user } = JSON.parse(accessToken);
      await this.redisService.client.del(`auth:refresh_token:${refreshToken}`);
      await this.redisService.client.del(`auth:token:${user.uid}`);
    }
  }

  /**
   * 移除RefreshToken
   * @param value
   */
  async removeRefreshToken(value: string) {
    const refresh_token_json = await this.redisService.client.get(
      `auth:refresh_token:${value}`,
    );

    if (refresh_token_json) {
      const { accessToken } = JSON.parse(refresh_token_json);
      await this.redisService.client.del(`auth:access_token:${accessToken}`);
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
