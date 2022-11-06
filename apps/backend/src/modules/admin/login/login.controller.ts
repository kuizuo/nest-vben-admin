import { Body, Controller, Get, Headers, Post, Query, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@/common/decorators/authorize.decorator';
import { ImageCaptchaDto, LoginInfoDto, RegisterInfoDto, sendCodeDto } from './login.dto';
import { ImageCaptcha, LoginToken } from './login.class';
import { LoginService } from './login.service';
import { LogDisabled } from '@/common/decorators/log-disabled.decorator';
import { UtilService } from '@/shared/services/util.service';
import { ResOp } from '@/common/class/res.class';
import { Keep } from '@/common/decorators/keep.decorator';
import { ApiResult } from '@/common/decorators/api-result.decorator';

@ApiTags('登录模块')
@Controller()
export class LoginController {
  constructor(private loginService: LoginService, private utils: UtilService) {}

  @Get('captcha/img')
  @ApiOperation({ summary: '获取登录图片验证码' })
  @ApiResult({ type: ImageCaptcha })
  @Authorize()
  async captchaByImg(@Query() dto: ImageCaptchaDto): Promise<ImageCaptcha> {
    return await this.loginService.createImageCaptcha(dto);
  }

  @Post('sendCode')
  @ApiOperation({ summary: '发送邮箱验证码' })
  @Authorize()
  @LogDisabled()
  @Keep()
  async sendCode(@Body() dto: sendCodeDto, @Req() req: FastifyRequest): Promise<any> {
    // await this.loginService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
    try {
      await this.loginService.sendCode(dto.email, this.utils.getReqIP(req));
      return ResOp.success();
    } catch (error) {
      console.log(error);
      return ResOp.error(500, error?.response);
    }
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiResult({ type: LoginToken })
  @Authorize()
  @LogDisabled()
  async login(
    @Body() dto: LoginInfoDto,
    @Req() req: FastifyRequest,
    @Headers('user-agent') ua: string,
  ): Promise<LoginToken> {
    // await this.loginService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
    const token = await this.loginService.getLoginSign(
      dto.username,
      dto.password,
      this.utils.getReqIP(req),
      ua,
    );
    return { token };
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  @Authorize()
  @LogDisabled()
  async register(@Body() dto: RegisterInfoDto): Promise<void> {
    await this.loginService.checkCode(dto.email, dto.code);
    await this.loginService.register(dto);
  }
}
