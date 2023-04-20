import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

import { Ip } from '@/decorators/http.decorator';
import { MailerService } from '@/modules/shared/mailer/mailer.service';

import { AuthUser, Public } from '../decorators';

import { SendEmailCodeDto } from '../dtos/captcha.dto';

@ApiTags('Auth - 认证模块')
@UseGuards(ThrottlerGuard)
@Controller('auth/email')
export class EmailController {
  constructor(private mailerService: MailerService) {}

  @Post('send')
  @ApiOperation({ summary: '发送邮箱验证码' })
  @Public()
  @Throttle(2, 60)
  async sendEmailCode(
    @Body() dto: SendEmailCodeDto,
    @Ip() ip: string,
    @AuthUser('uid') uid: number,
  ): Promise<void> {
    // await this.authService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
    const { email } = dto;

    await this.mailerService.checkLimit(email, ip);
    const { code } = await this.mailerService.sendCode(email);

    await this.mailerService.log(email, code, ip);
  }

  // @Post()
  // async authWithEmail(@AuthUser() user: IAuthUser) {
  //   // TODO:
  // }
}
