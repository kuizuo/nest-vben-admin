import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerOptions } from 'typeorm';

import * as config from '@/config';
import { SharedModule } from '@/modules/shared/shared.module';

import { IDatabaseConfig } from './config';
import { ConstraintModule } from './constraints/constraint.module';
import { AuthGuard } from './guards/auth.guard';
import { env } from './helper/config';
import { MissionModule } from './mission/mission.module';

import { AuthModule } from './modules/auth/auth.module';
import { SystemModule } from './modules/system/system.module';
import { ToolsModule } from './modules/tools/tools.module';
import { TypeORMLogger } from './providers/typeorm-logger';

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
