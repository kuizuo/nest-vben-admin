import { EmailService } from '@/shared/services/email.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SendEmailDto } from './email.dto';

@ApiTags('邮箱模块')
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @ApiOperation({ summary: '发送邮件' })
  @Post('send')
  async send(@Body() dto: SendEmailDto): Promise<void> {
    const { to, subject, content } = dto;
    await this.emailService.sendMailHtml(to, subject, content);
  }
}
