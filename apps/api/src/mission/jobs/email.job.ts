import { BadRequestException, Injectable } from '@nestjs/common';

import { EmailService } from '@/modules/shared/mailer/mailer.service';

import { AppLoggerService } from '../../modules/shared/services/app-logger.service';
import { Mission } from '../mission.decorator';

/**
 * Api接口请求类型任务
 */
@Injectable()
@Mission()
export class EmailJob {
  constructor(
    private readonly emailService: EmailService,
    private readonly logger: AppLoggerService,
  ) {}

  async send(config: any): Promise<void> {
    if (config) {
      const { to, subject, content } = config;
      const result = await this.emailService.send(to, subject, content);
      this.logger.log(result, EmailJob.name);
    } else {
      throw new BadRequestException('Email send job param is empty');
    }
  }
}
