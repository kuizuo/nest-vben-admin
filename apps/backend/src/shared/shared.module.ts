import { MailerModule } from '@nestjs-modules/mailer';
import { HttpModule } from '@nestjs/axios';
import { Global, CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from './services/email.service';
import { QQService } from './services/qq.service';
import { RedisModule } from './redis/redis.module';
import { RedisService } from './services/redis.service';
import { UtilService } from './services/util.service';
import { IpService } from './services/ip.service';
import { AppConfigService } from './services/app/app-config.service';
import { AppLoggerService } from './services/app/app-logger.service';
import { AppGeneralService } from './services/app/app-general.service';

const providers = [
  AppConfigService,
  AppLoggerService,
  AppGeneralService,
  UtilService,
  RedisService,
  EmailService,
  QQService,
  IpService,
];

@Global()
@Module({
  imports: [
    HttpModule,
    // redis cache
    CacheModule.register(),
    // jwt
    JwtModule.registerAsync({
      useFactory: (configService: AppConfigService) => configService.jwtConfig,
      inject: [AppConfigService],
    }),
    // redis
    RedisModule.registerAsync({
      useFactory: (configService: AppConfigService) => configService.redisConfig,
      inject: [AppConfigService],
    }),
    // mailer
    MailerModule.forRootAsync({
      useFactory: (configService: AppConfigService) => ({
        transport: configService.mailerConfig,
      }),
      inject: [AppConfigService],
    }),
  ],
  providers: [...providers],
  exports: [HttpModule, CacheModule, JwtModule, ...providers],
})
export class SharedModule {}
