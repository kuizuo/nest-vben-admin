import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

import * as config from '@/config';
import { SharedModule } from '@/shared/shared.module';

import { AllExceptionsFilter } from './common/filters/any-exception.filter';

import { TodoModule } from './modules/todo/todo.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RbacGuard } from './modules/auth/guards/rbac.guard';
import { HealthModule } from './modules/health/health.module';
import { SocketModule } from './modules/socket/socket.module';
import { SystemModule } from './modules/system/system.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ToolsModule } from './modules/tools/tools.module';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: [...Object.values(config)],
    }),
    SharedModule,
    DatabaseModule,

    AuthModule,
    SystemModule,
    TasksModule,
    ToolsModule,
    SocketModule,
    HealthModule,

    // biz

    // end biz

    TodoModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },

    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RbacGuard },
  ],
})
export class AppModule {}
