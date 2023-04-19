import { Module, forwardRef } from '@nestjs/common';

import { SystemModule } from '../system/system.module';

import { AdminWSGateway } from './admin-ws.gateway';
import { AdminWSService } from './admin-ws.service';
import { AuthService } from './auth.service';

const providers = [AdminWSGateway, AuthService, AdminWSService];

/**
 * WebSocket Module
 */
@Module({
  imports: [forwardRef(() => SystemModule)],
  providers,
  exports: [...providers],
})
export class WSModule {}
