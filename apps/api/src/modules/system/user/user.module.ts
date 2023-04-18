import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SystemModule } from '../system.module';

import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';

const services = [UserService];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => SystemModule),
  ],
  controllers: [UserController],
  providers: [...services],
  exports: [TypeOrmModule, ...services],
})
export class UserModule {}
