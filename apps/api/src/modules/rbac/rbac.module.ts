import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SystemModule } from '../system/system.module';

const services = [];

@Module({
  imports: [forwardRef(() => SystemModule)],
  controllers: [],
  providers: [...services],
  exports: [TypeOrmModule, ...services],
})
export class RbacModule {}
