import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';

import { CaptchaLogService } from './services/captcha-log.service';
import { LoginLogService } from './services/login-log.service';
import { TaskLogService } from './services/task-log.service';

import { TaskLogEntity } from './entities/task-log.entity';
import { LoginLogEntity } from './entities/login-log.entity';
import { CaptchaLogEntity } from './entities/captcha-log.entity';

const providers = [LoginLogService, TaskLogService, CaptchaLogService];

@Module({
  imports: [
    TypeOrmModule.forFeature([LoginLogEntity, CaptchaLogEntity, TaskLogEntity]),
    UserModule,
  ],
  controllers: [],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class LogModule {}
