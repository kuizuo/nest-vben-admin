import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from '../user/entities/user.entity'

import { EmailController } from './email/email.controller'
import { StorageController } from './storage/storage.controller'

import { Storage } from './storage/storage.entity'
import { StorageService } from './storage/storage.service'
import { UploadController } from './upload/upload.controller'
import { UploadService } from './upload/upload.service'

@Module({
  imports: [TypeOrmModule.forFeature([Storage, UserEntity])],
  controllers: [EmailController, StorageController, UploadController],
  providers: [StorageService, UploadService],
  exports: [TypeOrmModule, StorageService, UploadService],
})
export class ToolsModule {}
