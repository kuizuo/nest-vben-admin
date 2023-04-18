import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

import { isEmpty } from 'lodash';
import * as svgCaptcha from 'svg-captcha';

import { ErrorEnum } from '@/constants/error';
import { ApiResult, LogDisabled } from '@/decorators';
import { Ip } from '@/decorators/http.decorator';
import { EmailService } from '@/modules/shared/services/email.service';
import { RedisService } from '@/modules/shared/services/redis.service';

import { generateUUID } from '@/utils';

import { AuthUser, SkipAuth } from '../decorators';

import {
  CheckCodeDto,
  ImageCaptchaDto,
  SendEmailCodeDto,
  SendSmsCodeDto,
} from '../dtos/captcha.dto';
import { CaptchaService } from '../services/captcha.service';
import { ImageCaptcha } from '../models/auth.model';
import { TokenService } from '../services/token.service';

@ApiTags('Captcha - 验证码模块')
@UseGuards(ThrottlerGuard)
@Controller()
export class CaptchaController {
  constructor(
    private tokenService: TokenService,
    private captchaService: CaptchaService,
    private emailService: EmailService,
    private redisService: RedisService,
  ) {}

  @Get('captcha/img')
  @ApiOperation({ summary: '获取登录图片验证码' })
  @ApiResult({ type: ImageCaptcha })
  @SkipAuth()
  @LogDisabled()
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
    await this.redisService.client.set(
      `captcha:img:${result.id}`,
      svg.text,
      'EX',
      60 * 5,
    );
    return result;
  }

  @Post('send_email_code')
  @ApiOperation({ summary: '发送邮箱验证码' })
  @SkipAuth()
  @LogDisabled()
  async sendEmailCode(
    @Body() dto: SendEmailCodeDto,
    @Ip() ip: string,
    @AuthUser('uid') uid: number,
  ): Promise<void> {
    // await this.authService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
    const { email } = dto;

    await this.emailService.checkLimit(email, ip);
    const { to, code } = await this.emailService.sendCode(email);

    await this.emailService.saveRecord(email, code, ip);
    await this.captchaService.log(to, code, 'email', uid);
  }
}
