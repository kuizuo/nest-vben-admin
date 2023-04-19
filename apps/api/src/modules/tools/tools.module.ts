import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailService } from '@/modules/shared/services/email.service';

import { UserEntity } from '../system/user/entities/user.entity';

import { EmailController } from './email/email.controller';
import { StorageController } from './storage/storage.controller';

import { ToolStorage } from './storage/storage.entity';
import { StorageService } from './storage/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([ToolStorage, UserEntity])],
  controllers: [EmailController, StorageController],
  providers: [EmailService, StorageService],
  exports: [TypeOrmModule, EmailService, StorageService],
})
export class ToolsModule {}
