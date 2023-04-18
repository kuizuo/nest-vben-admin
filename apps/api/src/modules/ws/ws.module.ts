import { Module, forwardRef } from '@nestjs/common';
import { AdminWSGateway } from './admin-ws.gateway';
import { AuthService } from './auth.service';
import { AdminWSService } from './admin-ws.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from '../system/system.module';

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
