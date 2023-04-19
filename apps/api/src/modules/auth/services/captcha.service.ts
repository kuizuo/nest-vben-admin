import { Injectable } from '@nestjs/common';

import { isEmpty } from 'lodash';

import { ErrorEnum } from '@/constants/error';
import { ApiException } from '@/exceptions/api.exception';
import { RedisService } from '@/modules/shared/redis/redis.service';
import { CaptchaLogService } from '@/modules/system/log/services/captcha-log.service';

@Injectable()
export class CaptchaService {
  constructor(
    private redisService: RedisService,
    private captchaLogService: CaptchaLogService,
  ) {}

  /**
   * 校验图片验证码
   */
  async checkImgCaptcha(id: string, code: string): Promise<void> {
    const result = await this.redisService.client.get(`captcha:img:${id}`);
    if (isEmpty(result) || code.toLowerCase() !== result.toLowerCase()) {
      throw new ApiException(ErrorEnum.CODE_1002);
    }
    // 校验成功后移除验证码
    await this.redisService.client.del(`captcha:img:${id}`);
  }

  async log(
    account: string,
    code: string,
    provider: 'sms' | 'email',
    uid?: number,
  ): Promise<void> {
    await this.captchaLogService.create(account, code, provider, uid);
  }
}
