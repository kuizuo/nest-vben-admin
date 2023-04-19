import { Module } from '@nestjs/common';

import { LogModule } from '../system/log/log.module';
import { MenuModule } from '../system/menu/menu.module';
import { RoleModule } from '../system/role/role.module';
import { UserModule } from '../system/user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './services/token.service';

const controllers = [AuthController];
const providers = [AuthService, TokenService];

@Module({
  imports: [UserModule, RoleModule, MenuModule, LogModule],
  controllers: [...controllers],
  providers: [...providers],
  exports: [...providers],
})
export class AuthModule {}
