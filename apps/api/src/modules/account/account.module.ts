import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { SystemModule } from '../system/system.module';

import { AccountController } from './account.controller';

@Module({
  imports: [SystemModule, AuthModule],
  controllers: [AccountController],
})
export class AccountModule {}
