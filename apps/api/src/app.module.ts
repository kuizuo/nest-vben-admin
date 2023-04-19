import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';

import { SharedModule } from '@/modules/shared/shared.module';

import { AppConfigModule } from './config/config.module';
import { AppDatabaseModule } from './database/database.module';
import { AuthGuard } from './guards/auth.guard';

import { MissionModule } from './mission/mission.module';

import { AuthModule } from './modules/auth/auth.module';
import { SocketModule } from './modules/socket/socket.module';
import { SystemModule } from './modules/system/system.module';
import { ToolsModule } from './modules/tools/tools.module';

@Module({
  imports: [
    AppConfigModule,
    AppDatabaseModule,
    SharedModule,
    MissionModule,
    BullModule,
    AuthModule,
    SystemModule,
    ToolsModule,
    SocketModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
