import { Module, forwardRef } from '@nestjs/common';

import { SystemModule } from '../system.module';

import { OnlineService } from './online.service';
import { OnlineController } from './online.controller';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { WSModule } from '@/modules/ws/ws.module';

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
