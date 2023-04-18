import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppsModule } from './modules/apps/apps.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { MissionModule } from './mission/mission.module';
import { ConstraintModule } from './constraints/constraint.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { env } from './helper/config';
import { LoggerOptions } from 'typeorm';
import { IDatabaseConfig } from './config';
import { TypeORMLogger } from './providers/typeorm-logger';
import { SharedModule } from '@/modules/shared/shared.module';
import { SystemModule } from './modules/system/system.module';
import { AuthModule } from './modules/auth/auth.module';
import { ToolsModule } from './modules/tools/tools.module';

import * as config from '@/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env.local', '.env'],
      load: [...Object.values(config)],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        let loggerOptions: LoggerOptions = env('DB_LOGGING') as 'all';

        try {
          loggerOptions = JSON.parse(loggerOptions);
        } catch {
          // ignore
        }

        return {
          ...configService.get<IDatabaseConfig>('database'),
          type: 'mysql',
          logging: loggerOptions,
          logger: new TypeORMLogger(loggerOptions),
        };
      },
      inject: [ConfigService],
    }),
    SharedModule,
    MissionModule,
    BullModule,
    AppsModule,
    AuthModule,
    SystemModule,
    ToolsModule,
    // 自定义约束模块
    ConstraintModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
