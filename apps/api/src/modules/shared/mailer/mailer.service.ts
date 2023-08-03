import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import dayjs from 'dayjs';

import Redis from 'ioredis';

import { IAppConfig } from '@/config';
import { ErrorEnum } from '@/constants/error-code.constant';
import { ApiException } from '@/exceptions/api.exception';

import { randomValue } from '@/utils';

@Injectable()
export class MailerService {
  constructor(
    @InjectRedis() private redis: Redis,
    private mailerService: NestMailerService,
    private configService: ConfigService,
  ) {}

  async send(to, subject, content): Promise<any> {
    console.log(to, subject, content);

    return this.mailerService.sendMail({
      to,
      from: {
        name: this.configService.get<IAppConfig>('app').name,
        address: this.configService.get<string>('mailer.auth.user'),
      },
      subject,
      text: content,
    });
  }

  async sendMailHtml(to, subject, html): Promise<any> {
    return this.mailerService.sendMail({
      to,
      from: {
        name: this.configService.get<IAppConfig>('app').name,
        address: this.configService.get<string>('mailer.auth.user'),
      },
      subject,
      html,
    });
  }

  async sendCode(to, code = randomValue(4, '1234567890')) {
    const content = `尊敬的用户您好，您的验证码是${code}，请于5分钟内输入。`;

    try {
      await this.send(
        to,
        `${this.configService.get<IAppConfig>('app').name}验证码通知`,
        content,
      );
    } catch (error) {
      console.log(error);
      throw new ApiException(ErrorEnum.VERIFICATION_CODE_SEND_FAILED);
    }

    return {
      to,
      code,
    };
  }

  async checkCode(to, code) {
    const ret = await this.redis.get(`captcha:${to}`);
    if (ret !== code) {
      throw new ApiException(ErrorEnum.INVALID_VERIFICATION_CODE);
    }
    await this.redis.del(`captcha:${to}`);
  }

  async checkLimit(to, ip) {
    const LIMIT_TIME = 5;

    // ip限制
    const ipLimit = await this.redis.get(`ip:${ip}:send:limit`);
    if (ipLimit) throw new ApiException(ErrorEnum.TOO_MANY_REQUESTS);

    // 1分钟最多接收1条
    const limit = await this.redis.get(`captcha:${to}:limit`);
    if (limit) throw new ApiException(ErrorEnum.TOO_MANY_REQUESTS);

    // 1天一个邮箱最多接收5条
    let limitCountOfDay: string | number = await this.redis.get(
      `captcha:${to}:limit-day`,
    );
    limitCountOfDay = limitCountOfDay ? Number(limitCountOfDay) : 0;
    if (limitCountOfDay > LIMIT_TIME)
      throw new ApiException(ErrorEnum.MAXIMUM_FIVE_VERIFICATION_CODES_PER_DAY);

    // 1天一个ip最多发送5条
    let ipLimitCountOfDay: string | number = await this.redis.get(
      `ip:${ip}:send:limit-day`,
    );
    ipLimitCountOfDay = ipLimitCountOfDay ? Number(ipLimitCountOfDay) : 0;
    if (ipLimitCountOfDay > LIMIT_TIME)
      throw new ApiException(ErrorEnum.MAXIMUM_FIVE_VERIFICATION_CODES_PER_DAY);
  }

  async log(to: string, code: string, ip: string) {
    const getRemainTime = () => {
      const now = dayjs();
      return now.endOf('day').diff(now, 'second');
    };

    await this.redis.set(`captcha:${to}`, code, 'EX', 60 * 5);

    const limitCountOfDay = await this.redis.get(`captcha:${to}:limit-day`);
    const ipLimitCountOfDay = await this.redis.get(`ip:${ip}:send:limit-day`);

    await this.redis.set(`ip:${ip}:send:limit`, 1, 'EX', 60);
    await this.redis.set(`captcha:${to}:limit`, 1, 'EX', 60);
    await this.redis.set(
      `captcha:${to}:send:limit-count-day`,
      limitCountOfDay,
      'EX',
      getRemainTime(),
    );
    await this.redis.set(
      `ip:${ip}:send:limit-count-day`,
      ipLimitCountOfDay,
      'EX',
      getRemainTime(),
    );
  }
}
