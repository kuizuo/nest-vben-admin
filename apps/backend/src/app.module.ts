import configuration from './config/configuration';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { AppsModule } from './modules/apps/apps.module';
import { WSModule } from './modules/ws/ws.module';
import { LoggerModuleOptions, WinstonLogLevel } from './shared/logger/logger.interface';
import { LoggerModule } from './shared/logger/logger.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMLoggerService } from './shared/logger/typeorm-logger.service';
import { BullModule } from '@nestjs/bull';
import { MissionModule } from './mission/mission.module';
import { LOGGER_MODULE_OPTIONS } from './shared/logger/logger.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      useFactory: (configService: ConfigService, loggerOptions: LoggerModuleOptions) => ({
        autoLoadEntities: true,
        type: configService.get<any>('mysql.type'),
        host: configService.get<string>('mysql.host'),
        port: configService.get<number>('mysql.port'),
        username: configService.get<string>('mysql.username'),
        password: configService.get<string>('mysql.password'),
        database: configService.get<string>('mysql.database'),
        synchronize: configService.get<boolean>('mysql.synchronize'),
        logging: configService.get('mysql.logging'),
        timezone: configService.get('mysql.timezone'), // 时区
        logger: new TypeORMLoggerService(configService.get('mysql.logging'), loggerOptions),
      }),
      inject: [ConfigService, LOGGER_MODULE_OPTIONS],
    }),
    LoggerModule.forRootAsync(
      {
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          return {
            level: configService.get<WinstonLogLevel>('logger.level'),
            consoleLevel: configService.get<WinstonLogLevel>('logger.consoleLevel'),
            timestamp: configService.get<boolean>('logger.timestamp'),
            maxFiles: configService.get<string>('logger.maxFiles'),
            maxFileSize: configService.get<string>('logger.maxFileSize'),
            disableConsoleAtProd: configService.get<boolean>('logger.disableConsoleAtProd'),
            dir: configService.get<string>('logger.dir'),
            errorLogName: configService.get<string>('logger.errorLogName'),
            appLogName: configService.get<string>('logger.appLogName'),
          };
        },
        inject: [ConfigService],
      },
      true,
    ),
    MissionModule.forRoot(),
    BullModule.forRoot({}),
    SharedModule,
    AdminModule,
    AppsModule,
    WSModule,
  ],
})
export class AppModule {}
