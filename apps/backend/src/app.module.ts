import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { AppsModule } from './modules/apps/apps.module';
import { WSModule } from './modules/ws/ws.module';
import { SharedModule } from './shared/shared.module';
import { AppConfigService } from './shared/services/app/app-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { MissionModule } from './mission/mission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env.local',
        '.env',
      ],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: AppConfigService) => configService.typeormConfig,
      inject: [AppConfigService],
    }),
    SharedModule,
    MissionModule,
    BullModule,
    AdminModule,
    AppsModule,
    WSModule,
  ],
})
export class AppModule {}
