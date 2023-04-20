import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Ip } from '@/decorators';
import { ApiResult } from '@/decorators/api-result.decorator';

import { UserService } from '../system/user/user.service';

import { AuthService } from './auth.service';
import { Public } from './decorators';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { LocalGuard } from './guards/local.guard';
import { LoginToken } from './models/auth.model';

@ApiTags('Auth - 认证模块')
@UseGuards(LocalGuard)
@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiResult({ type: LoginToken })
  async login(
    @Body() dto: LoginDto,
    @Ip() ip: string,
    @Headers('user-agent') ua: string,
  ): Promise<LoginToken> {
    // await this.loginService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
    const token = await this.authService.login(
      dto.username,
      dto.password,
      ip,
      ua,
    );
    return { token };
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() dto: RegisterDto): Promise<void> {
    await this.userService.register(dto);
  }
}
