import { Module, forwardRef } from '@nestjs/common'

import { AuthModule } from '../auth/auth.module'
import { SystemModule } from '../system/system.module'

import { AdminWSGateway } from './admin-ws.gateway'
import { AdminWSService } from './admin-ws.service'
import { AuthService } from './auth.service'

const providers = [AdminWSGateway, AuthService, AdminWSService]

/**
 * WebSocket Module
 */
@Module({
  imports: [forwardRef(() => SystemModule), AuthModule],
  providers,
  exports: [...providers],
})
export class SocketModule {}
