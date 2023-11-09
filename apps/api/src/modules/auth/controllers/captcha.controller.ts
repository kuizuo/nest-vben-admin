import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

import Redis from 'ioredis';
import { isEmpty } from 'lodash';
import * as svgCaptcha from 'svg-captcha';

import { ApiResult } from '@/decorators';

import { generateUUID } from '@/utils';

import { Public } from '../decorators';

import { ImageCaptchaDto } from '../dto/captcha.dto';
import { ImageCaptcha } from '../models/auth.model';

@ApiTags('Captcha - 验证码模块')
@UseGuards(ThrottlerGuard)
@Controller('auth/captcha')
export class CaptchaController {
  constructor(@InjectRedis() private redis: Redis) {}

  @Get('img')
  @ApiOperation({ summary: '获取登录图片验证码' })
  @ApiResult({ type: ImageCaptcha })
  @Public()
  @Throttle({ default: { limit: 2, ttl: 60000 } })
  async captchaByImg(@Query() dto: ImageCaptchaDto): Promise<ImageCaptcha> {
    const { width, height } = dto;

    const svg = svgCaptcha.create({
      size: 4,
      color: true,
      noise: 4,
      width: isEmpty(width) ? 100 : width,
      height: isEmpty(height) ? 50 : height,
      charPreset: '1234567890',
    });
    const result = {
      img: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString(
        'base64',
      )}`,
      id: generateUUID(),
    };
    // 5分钟过期时间
    await this.redis.set(`captcha:img:${result.id}`, svg.text, 'EX', 60 * 5);
    return result;
  }
}
