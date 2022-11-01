import { ISendMailOptions, MailerService, MailerTransportFactory } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendMail(to, subject, content): Promise<any> {
    return await this.mailerService.sendMail({
      to: to,
      from: {
        name: this.configService.get<string>('appName'),
        address: this.configService.get<string>('email.user'),
      },
      subject: subject,
      text: content,
    });
  }

  async sendMailHtml(to, subject, html): Promise<any> {
    return await this.mailerService.sendMail({
      to: to,
      from: {
        name: this.configService.get<string>('appName'),
        address: this.configService.get<string>('email.user'),
      },
      subject: subject,
      html: html,
    });
  }

  async sendCodeMail(to, code) {
    const content = `尊敬的用户您好，您的验证码是${code}，请于5分钟内输入。`;
    const ret = await this.sendMail(
      to,
      `[${this.configService.get<string>('appName')}] ` + '验证码通知',
      content,
    );

    if (!ret) return '发送验证码失败';
    return '发送邮箱验证码成功，请在5分钟内输入';
  }
}
