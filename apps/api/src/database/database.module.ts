import { Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerOptions } from 'typeorm';

import { IDatabaseConfig } from '@/config';
import { env } from '@/config/env';

import { EntityExistConstraint } from './constraints/entity-exist.constraint';
import { UniqueConstraint } from './constraints/unique.constraint';
import { TypeORMLogger } from './typeorm-logger';

const providers = [EntityExistConstraint, UniqueConstraint];

@Module({
  imports: [
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
          autoLoadEntities: true,
          logging: loggerOptions,
          logger: new TypeORMLogger(loggerOptions),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers,
  exports: providers,
})
export class AppDatabaseModule {}
