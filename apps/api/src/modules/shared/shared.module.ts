import { MailerModule } from '@nestjs-modules/mailer';
import { HttpModule } from '@nestjs/axios';
import { Global, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';

import { IJwtConfig, IMailerConfig, IRedisConfig } from '@/config';

import { RedisModule } from './redis/redis.module';
import { AppGeneralService } from './services/app-general.service';
import { AppLoggerService } from './services/app-logger.service';
import { EmailService } from './services/email.service';
import { IpService } from './services/ip.service';
import { RedisService } from './services/redis.service';
import { QQService } from './services/qq.service';

const providers = [
  AppLoggerService,
  AppGeneralService,
  RedisService,
  EmailService,
  IpService,
  QQService,
];

@Global()
@Module({
  imports: [
    // http
    HttpModule,
    // redis cache
    CacheModule.register({
      isGlobal: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // store: redisStore,

      // host: 'localhost',
      // port: 6379,
    }),
    // rate limit
    ThrottlerModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: 60,
        limit: 5,
      }),
    }),
    // jwt
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { secret, expires } = configService.get<IJwtConfig>('jwt');

        return {
          secret,
          expires,
          ignoreExpiration: process.env.NODE_ENV === 'development',
        };
      },
      inject: [ConfigService],
    }),
    // redis
    RedisModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get<IRedisConfig>('redis'),
      inject: [ConfigService],
    }),
    // mailer
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: configService.get<IMailerConfig>('mailer'),
      }),
      inject: [ConfigService],
    }),
    // sms
    // SmsModule.registerAsync({}),
  ],
  providers: [...providers],
  exports: [HttpModule, CacheModule, JwtModule, ...providers],
})
export class SharedModule {}
