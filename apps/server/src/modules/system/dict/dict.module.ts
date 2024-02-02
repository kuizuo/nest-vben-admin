import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DictController } from './dict.controller'
import { DictEntity } from './dict.entity'
import { DictService } from './dict.service'

const services = [DictService]

@Module({
  imports: [TypeOrmModule.forFeature([DictEntity])],
  controllers: [DictController],
  providers: [...services],
  exports: [TypeOrmModule, ...services],
})
export class DictModule {}
