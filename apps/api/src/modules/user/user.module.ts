import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DictModule } from '../system/dict/dict.module';

import { MenuModule } from '../system/menu/menu.module';
import { RoleModule } from '../system/role/role.module';

import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const providers = [UserService];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    RoleModule,
    MenuModule,
    DictModule,
  ],
  controllers: [UserController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class UserModule {}
