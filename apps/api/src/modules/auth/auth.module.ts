import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SystemModule } from '../system/system.module';
import { TokenService } from './services/token.service';
import { UserModule } from '../system/user/user.module';
import { LogModule } from '../system/log/log.module';

const controllers = [AuthController];
const services = [AuthService, TokenService];

@Module({
  imports: [forwardRef(() => SystemModule), LogModule, UserModule],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class AuthModule {}
