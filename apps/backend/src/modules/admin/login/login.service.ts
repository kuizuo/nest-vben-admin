import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import { ImageCaptcha } from './login.class';
import { isEmpty } from 'lodash';
import { ImageCaptchaDto, RegisterInfoDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import { UtilService } from '@/shared/services/util.service';
import { SysMenuService } from '../system/menu/menu.service';
import { SysUserService } from '../system/user/user.service';
import { ApiException } from '@/common/exceptions/api.exception';
import { SysLogService } from '../system/log/log.service';
import { RedisService } from '@/shared/services/redis.service';
import { EmailService } from '@/shared/services/email.service';
import dayjs from 'dayjs';
import { ErrorEnum } from '@/common/constants/error';

@Injectable()
export class LoginService {
  constructor(
    private redisService: RedisService,
    private menuService: SysMenuService,
    private userService: SysUserService,
    private logService: SysLogService,
    private emailService: EmailService,
    private util: UtilService,
    private jwtService: JwtService,
  ) {}

  /**
   * 创建验证码并缓存加入redis缓存
   * @param captcha 验证码长宽
   * @returns svg & id obj
   */
  async createImageCaptcha(captcha: ImageCaptchaDto): Promise<ImageCaptcha> {
    const svg = svgCaptcha.create({
      size: 4,
      color: true,
      noise: 4,
      width: isEmpty(captcha.width) ? 100 : captcha.width,
      height: isEmpty(captcha.height) ? 50 : captcha.height,
      charPreset: '1234567890',
    });
    const result = {
      img: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString(
        'base64',
      )}`,
      id: this.util.generateUUID(),
    };
    // 5分钟过期时间
    await this.redisService
      .getRedis()
      .set(`admin:captcha:img:${result.id}`, svg.text, 'EX', 60 * 5);
    return result;
  }

  /**
   * 校验图片验证码
   */
  async checkImgCaptcha(id: string, code: string): Promise<void> {
    const result = await this.redisService
      .getRedis()
      .get(`admin:captcha:img:${id}`);
    if (isEmpty(result) || code.toLowerCase() !== result.toLowerCase()) {
      throw new ApiException(ErrorEnum.CODE_1002);
    }
    // 校验成功后移除验证码
    await this.redisService.getRedis().del(`admin:captcha:img:${id}`);
  }

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
    const comparePassword = this.util.md5(`${password}${user.psalt}`);
    if (user.password !== comparePassword) {
      throw new ApiException(ErrorEnum.CODE_1003);
    }
    const perms = await this.menuService.getPerms(user.id);

    // 系统管理员允许多点登录
    if (user.id === 1) {
      const oldToken = await this.getRedisTokenById(user.id);
      await this.logService.saveLoginLog(user.id, ip, ua);
      if (oldToken) return oldToken;
    }

    const jwtSign = this.jwtService.sign(
      {
        uid: parseInt(user.id.toString()),
        pv: 1,
      },
      // {
      //   expiresIn: '24h',
      // },
    );
    await this.redisService
      .getRedis()
      .set(`admin:passwordVersion:${user.id}`, 1);
    // Token设置过期时间 24小时
    await this.redisService
      .getRedis()
      .set(`admin:token:${user.id}`, jwtSign, 'EX', 60 * 60 * 24);
    await this.redisService
      .getRedis()
      .set(`admin:perms:${user.id}`, JSON.stringify(perms));
    await this.logService.saveLoginLog(user.id, ip, ua);
    return jwtSign;
  }

  /**
   * 注册
   */
  async register(param: RegisterInfoDto): Promise<void> {
    await this.userService.register(param);
  }

  /**
   * 发送验证码
   */
  async sendCode(email: string, ip: string): Promise<any> {
    const LIMIT_TIME = 5;
    const getRemainTime = () => {
      const now = dayjs();
      return now.endOf('day').diff(now, 'second');
    };

    // ip限制
    const ipLimit = await this.redisService
      .getRedis()
      .get(`admin:ip:${ip}:code:limit`);
    if (ipLimit) throw new ApiException(ErrorEnum.CODE_1201);

    // 1分钟最多接收1条
    const limit = await this.redisService
      .getRedis()
      .get(`admin:email:${email}:limit`);
    if (limit) throw new ApiException(ErrorEnum.CODE_1201);

    // 1天一个邮箱最多接收5条
    let limitDayNum: string | number = await this.redisService
      .getRedis()
      .get(`admin:email:${email}:limit-day`);
    limitDayNum = limitDayNum ? parseInt(limitDayNum) : 0;
    if (limitDayNum > LIMIT_TIME) throw new ApiException(ErrorEnum.CODE_1202);

    // 1天一个ip最多发送5条
    let ipLimitDayNum: string | number = await this.redisService
      .getRedis()
      .get(`admin:ip:${ip}:code:limit-day`);
    ipLimitDayNum = ipLimitDayNum ? parseInt(ipLimitDayNum) : 0;
    if (ipLimitDayNum > LIMIT_TIME) throw new ApiException(ErrorEnum.CODE_1202);
    if (ipLimitDayNum) throw new ApiException(ErrorEnum.CODE_1201);

    // 发送验证码
    const code = Math.random().toString(16).substring(2, 6);
    await this.emailService.sendCodeMail(email, code);

    await this.redisService
      .getRedis()
      .set(`admin:ip:${ip}:code:limit`, 1, 'EX', 60);
    await this.redisService
      .getRedis()
      .set(`admin:email:${email}:limit`, 1, 'EX', 60);
    await this.redisService
      .getRedis()
      .set(
        `admin:email:${email}:limit-day`,
        ++limitDayNum,
        'EX',
        getRemainTime(),
      );
    await this.redisService
      .getRedis()
      .set(
        `admin:ip:${ip}:code:limit-day`,
        ++ipLimitDayNum,
        'EX',
        getRemainTime(),
      );

    // 验证码5分钟过期时间
    await this.redisService
      .getRedis()
      .set(`admin:email:${email}:code`, code, 'EX', 60 * 5);
  }

  /**
   * 校验验证码
   */
  async checkCode(email: string, code: string): Promise<void> {
    const result = await this.redisService
      .getRedis()
      .get(`admin:email:${email}:code`);
    if (isEmpty(result) || code.toLowerCase() !== result.toLowerCase()) {
      throw new ApiException(ErrorEnum.CODE_1002);
    }
    // 校验成功后移除验证码
    await this.redisService.getRedis().del(`admin:email:${email}:code`);
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
    return await this.menuService.getMenus(uid);
  }

  /**
   * 获取权限列表
   */
  async getPerm(uid: number): Promise<string[]> {
    return await this.menuService.getPerms(uid);
  }

  async getRedisPasswordVersionById(id: number): Promise<string> {
    return this.redisService.getRedis().get(`admin:passwordVersion:${id}`);
  }

  async getRedisTokenById(id: number): Promise<string> {
    return this.redisService.getRedis().get(`admin:token:${id}`);
  }

  async getRedisPermsById(id: number): Promise<string> {
    return this.redisService.getRedis().get(`admin:perms:${id}`);
  }
}
