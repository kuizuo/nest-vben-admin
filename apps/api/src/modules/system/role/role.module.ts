import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SystemModule } from '../system.module';

import { RoleService } from './role.service';
import { RoleEntity } from './role.entity';
import { RoleController } from './role.controller';

const providers = [RoleService];

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    forwardRef(() => SystemModule),
  ],
  controllers: [RoleController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class RoleModule {}
