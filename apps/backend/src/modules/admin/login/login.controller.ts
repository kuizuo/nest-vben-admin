import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '@/common/decorators/skip-auth.decorator';
import {
  ImageCaptchaDto,
  LoginInfoDto,
  RegisterInfoDto,
  sendCodeDto,
} from './login.dto';
import { ImageCaptcha, LoginToken } from './login.model';
import { LoginService } from './login.service';
import { LogDisabled } from '@/common/decorators/log-disabled.decorator';
import { SkipTransform } from '@/common/decorators/skip-transform.decorator';
import { ApiResult } from '@/common/decorators/api-result.decorator';
import { Ip } from '@/common/decorators';

@ApiTags('System - 登录模块')
@ApiExtraModels(ImageCaptcha, LoginToken)
@Controller()
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Get('captcha/img')
  @ApiOperation({ summary: '获取登录图片验证码' })
  @ApiResult({ type: ImageCaptcha })
  @SkipAuth()
  async captchaByImg(@Query() dto: ImageCaptchaDto): Promise<ImageCaptcha> {
    return await this.loginService.createImageCaptcha(dto);
  }

  @Post('sendCode')
  @ApiOperation({ summary: '发送邮箱验证码' })
  @SkipAuth()
  @SkipTransform()
  @LogDisabled()
  async sendCode(@Body() dto: sendCodeDto, @Ip() ip: string): Promise<any> {
    // await this.loginService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
    await this.loginService.sendCode(dto.email, ip);
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiResult({ type: LoginToken })
  @SkipAuth()
  @LogDisabled()
  async login(
    @Body() dto: LoginInfoDto,
    @Ip() ip: string,
    @Headers('user-agent') ua: string,
  ): Promise<LoginToken> {
    // await this.loginService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
    const token = await this.loginService.getLoginSign(
      dto.username,
      dto.password,
      ip,
      ua,
    );
    return { token };
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  @SkipAuth()
  @LogDisabled()
  async register(@Body() dto: RegisterInfoDto): Promise<void> {
    await this.loginService.checkCode(dto.email, dto.code);
    await this.loginService.register(dto);
  }
}
