import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SystemModule } from '../system.module';

import { DeptService } from './dept.service';
import { DeptEntity } from './dept.entity';
import { DeptController } from './dept.controller';

const services = [DeptService];

@Module({
  imports: [
    TypeOrmModule.forFeature([DeptEntity]),
    forwardRef(() => SystemModule),
  ],
  controllers: [DeptController],
  providers: [...services],
  exports: [TypeOrmModule, ...services],
})
export class DeptModule {}
