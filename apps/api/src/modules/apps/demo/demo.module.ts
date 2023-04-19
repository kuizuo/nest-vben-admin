import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DemoController } from './demo.controller';
import { DemoEntity } from './demo.entity';
import { DemoService } from './demo.service';

const services = [DemoService];

@Module({
  imports: [TypeOrmModule.forFeature([DemoEntity])],
  controllers: [DemoController],
  providers: [...services],
  exports: [TypeOrmModule, ...services],
})
export class DemoModule {}
