import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SystemModule } from '../system.module';

import { MenuService } from './menu.service';
import { MenuEntity } from './menu.entity';
import { MenuController } from './menu.controller';

const services = [MenuService];

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuEntity]),
    forwardRef(() => SystemModule),
  ],
  controllers: [MenuController],
  providers: [...services],
  exports: [TypeOrmModule, ...services],
})
export class MenuModule {}
