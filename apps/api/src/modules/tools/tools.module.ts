import { Module } from '@nestjs/common';
import { EmailController } from './email/email.controller';
import { EmailService } from '@/modules/shared/services/email.service';
import { StorageService } from './storage/storage.service';
import { StorageController } from './storage/storage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolStorage } from './storage/storage.entity';
import { UserEntity } from '../system/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToolStorage, UserEntity])],
  controllers: [EmailController, StorageController],
  providers: [EmailService, StorageService],
  exports: [TypeOrmModule, EmailService, StorageService],
})
export class ToolsModule {}
