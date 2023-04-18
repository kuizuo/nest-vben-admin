import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '@/decorators/skip-auth.decorator';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { ImageCaptcha, LoginToken } from './models/auth.model';
import { AuthService } from './auth.service';
import { LogDisabled } from '@/decorators/log-disabled.decorator';
import { ApiResult } from '@/decorators/api-result.decorator';
import { Ip } from '@/decorators';
import { UserService } from '../system/user/user.service';

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
