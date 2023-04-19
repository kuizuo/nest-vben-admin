import { Module, forwardRef } from '@nestjs/common';

import { WSModule } from '@/modules/ws/ws.module';

import { RoleModule } from '../role/role.module';
import { SystemModule } from '../system.module';

import { UserModule } from '../user/user.module';

import { OnlineController } from './online.controller';
import { OnlineService } from './online.service';

const providers = [OnlineService];

@Module({
  imports: [
    forwardRef(() => SystemModule),
    forwardRef(() => WSModule),
    UserModule,
    RoleModule,
  ],
  controllers: [OnlineController],
  providers: [...providers],
  exports: [...providers],
})
export class OnlineModule {}
