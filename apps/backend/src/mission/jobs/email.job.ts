import { EmailService } from '@/shared/services/email.service';
import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/shared/logger/logger.service';
import { Mission } from '../mission.decorator';

/**
 * Api接口请求类型任务
 */
@Injectable()
@Mission()
export class EmailJob {
  constructor(
    private readonly emailService: EmailService,
    private readonly logger: LoggerService,
  ) {}

  async send(config: any): Promise<void> {
    if (config) {
      const { to, subject, content } = config;
      const result = await this.emailService.sendMail(to, subject, content);
      this.logger.log(result, EmailJob.name);
    } else {
      throw new Error('Email send job param is empty');
    }
  }
}
