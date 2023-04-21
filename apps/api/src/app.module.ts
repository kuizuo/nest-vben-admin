import { Module } from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';

import { SharedModule } from '@/modules/shared/shared.module';

import { AppConfigModule } from './config/config.module';
import { AppDatabaseModule } from './database/database.module';

import { MissionModule } from './mission/mission.module';

import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RbacGuard } from './modules/rbac/guards/rbac.guard';
import { SocketModule } from './modules/socket/socket.module';
import { SystemModule } from './modules/system/system.module';
import { ToolsModule } from './modules/tools/tools.module';

@Module({
  imports: [
    AppConfigModule,
    AppDatabaseModule,
    SharedModule,
    AuthModule,
    SystemModule,
    MissionModule,
    ToolsModule,
    SocketModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RbacGuard,
    },
  ],
})
export class AppModule {}
