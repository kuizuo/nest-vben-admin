import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';

import { IAppConfig } from '@/config';
import { ErrorEnum } from '@/constants/error';
import { ApiException } from '@/exceptions/api.exception';

import { randomValue } from '@/utils';

import { RedisService } from '../redis/redis.service';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private redisService: RedisService,
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
      throw new ApiException(ErrorEnum.CODE_1203);
    }

    return {
      to,
      code,
    };
  }

  async checkCode(to, code) {
    const ret = await this.redisService.client.get(`captcha:${to}`);
    if (ret !== code) {
      throw new ApiException(ErrorEnum.CODE_1002);
    }
    await this.redisService.client.del(`captcha:${to}`);
  }

  async checkLimit(to, ip) {
    const LIMIT_TIME = 5;

    // ip限制
    const ipLimit = await this.redisService.client.get(`ip:${ip}:send:limit`);
    if (ipLimit) throw new ApiException(ErrorEnum.CODE_1201);

    // 1分钟最多接收1条
    const limit = await this.redisService.client.get(`captcha:${to}:limit`);
    if (limit) throw new ApiException(ErrorEnum.CODE_1201);

    // 1天一个邮箱最多接收5条
    let limitCountOfDay: string | number = await this.redisService.client.get(
      `captcha:${to}:limit-day`,
    );
    limitCountOfDay = limitCountOfDay ? Number(limitCountOfDay) : 0;
    if (limitCountOfDay > LIMIT_TIME)
      throw new ApiException(ErrorEnum.CODE_1202);

    // 1天一个ip最多发送5条
    let ipLimitCountOfDay: string | number = await this.redisService.client.get(
      `ip:${ip}:send:limit-day`,
    );
    ipLimitCountOfDay = ipLimitCountOfDay ? Number(ipLimitCountOfDay) : 0;
    if (ipLimitCountOfDay > LIMIT_TIME)
      throw new ApiException(ErrorEnum.CODE_1202);
  }

  async saveRecord(to: string, code: string, ip: string) {
    const getRemainTime = () => {
      const now = dayjs();
      return now.endOf('day').diff(now, 'second');
    };

    await this.redisService.client.set(`captcha:${to}`, code, 'EX', 60 * 5);

    const limitCountOfDay = await this.redisService.client.get(
      `captcha:${to}:limit-day`,
    );
    const ipLimitCountOfDay = await this.redisService.client.get(
      `ip:${ip}:send:limit-day`,
    );

    await this.redisService.client.set(`ip:${ip}:send:limit`, 1, 'EX', 60);
    await this.redisService.client.set(`captcha:${to}:limit`, 1, 'EX', 60);
    await this.redisService.client.set(
      `captcha:${to}:send:limit-count-day`,
      limitCountOfDay,
      'EX',
      getRemainTime(),
    );
    await this.redisService.client.set(
      `ip:${ip}:send:limit-count-day`,
      ipLimitCountOfDay,
      'EX',
      getRemainTime(),
    );
  }
}
