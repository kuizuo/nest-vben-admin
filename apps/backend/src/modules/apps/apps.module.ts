import { Test } from '@/entities/apps/test.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from '../admin/system/system.module';
import { TestController } from './test/test.controller';
import { TestService } from './test/test.service';

@Module({
  imports: [SystemModule, TypeOrmModule.forFeature([Test])],
  controllers: [TestController],
  providers: [TestService],
  exports: [TypeOrmModule],
})
export class AppsModule {}
