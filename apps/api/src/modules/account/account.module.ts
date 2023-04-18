import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AuthModule } from '../auth/auth.module';
import { SystemModule } from '../system/system.module';

@Module({
  imports: [SystemModule, AuthModule],
  controllers: [AccountController],
})
export class AccountModule {}
