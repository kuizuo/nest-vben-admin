import { ApiSecurityAuth } from '@/common/decorators/swagger.decorator';
import { EmailService } from '@/shared/services/email.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailSendDto } from './email.dto';

@ApiTags('邮箱模块')
@ApiSecurityAuth()
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @ApiOperation({ summary: '发送邮件' })
  @Post('send')
  async send(@Body() dto: EmailSendDto): Promise<void> {
    const { to, subject, content } = dto;
    await this.emailService.sendMailHtml(to, subject, content);
  }
}
