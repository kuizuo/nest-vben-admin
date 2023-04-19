import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DemoEntity } from '@/modules/apps/demo/demo.entity';

import { SystemModule } from '../system/system.module';

import { DemoController } from './demo/demo.controller';
import { DemoService } from './demo/demo.service';

@Module({
  imports: [
    forwardRef(() => SystemModule),
    TypeOrmModule.forFeature([DemoEntity]),
  ],
  controllers: [DemoController],
  providers: [DemoService],
  exports: [TypeOrmModule],
})
export class AppsModule {}
