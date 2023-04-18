import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { SystemModule } from '../system.module';

import { SYS_TASK_QUEUE_NAME, SYS_TASK_QUEUE_PREFIX } from '@/constants/task';
import { ConfigService } from '@nestjs/config';
import { IRedisConfig } from '@/config';

import { TaskService } from './task.service';
import { TaskEntity } from './task.entity';
import { TaskController } from './task.controller';
import { TaskConsumer } from './task.processor';

const providers = [TaskService, TaskConsumer];

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    BullModule.registerQueueAsync({
      name: SYS_TASK_QUEUE_NAME,
      useFactory: (configService: ConfigService) => ({
        redis: configService.get<IRedisConfig>('redis'),
        prefix: SYS_TASK_QUEUE_PREFIX,
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => SystemModule),
  ],
  controllers: [TaskController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class TaskModule {}
