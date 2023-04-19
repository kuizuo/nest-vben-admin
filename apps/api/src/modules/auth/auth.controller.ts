import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Ip } from '@/decorators';
import { ApiResult } from '@/decorators/api-result.decorator';
import { LogDisabled } from '@/decorators/log-disabled.decorator';
import { SkipAuth } from '@/decorators/skip-auth.decorator';

import { UserService } from '../system/user/user.service';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { LoginToken } from './models/auth.model';

@ApiTags('Auth - 登录模块')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiResult({ type: LoginToken })
  @SkipAuth()
  @LogDisabled()
  async login(
    @Body() dto: LoginDto,
    @Ip() ip: string,
    @Headers('user-agent') ua: string,
  ): Promise<LoginToken> {
    // await this.loginService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
    const token = await this.authService.getLoginSign(
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
  async register(@Body() dto: RegisterDto): Promise<void> {
    await this.userService.register(dto);
  }
}
