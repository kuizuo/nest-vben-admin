import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SystemModule } from '../system.module';

import { DictService } from './dict.service';
import { DictEntity } from './dict.entity';
import { DictController } from './dict.controller';

const services = [DictService];

@Module({
  imports: [
    TypeOrmModule.forFeature([DictEntity]),
    forwardRef(() => SystemModule),
  ],
  controllers: [DictController],
  providers: [...services],
  exports: [TypeOrmModule, ...services],
})
export class DictModule {}
