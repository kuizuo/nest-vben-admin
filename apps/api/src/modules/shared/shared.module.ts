import { RedisModule } from '@liaoliaots/nestjs-redis';
import { MailerModule } from '@nestjs-modules/mailer';
import { HttpModule } from '@nestjs/axios';
import { Global, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { IMailerConfig, IRedisConfig } from '@/config';

import { IpService } from './ip/ip.service';
import { MailerService } from './mailer/mailer.service';
import { QQService } from './qq/qq.service';
import { AppLoggerService } from './services/app-logger.service';

const providers = [AppLoggerService, MailerService, IpService, QQService];

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
    // redis
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        readyLog: true,
        config: configService.get<IRedisConfig>('redis'),
      }),
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
  ],
  providers: [...providers],
  exports: [HttpModule, CacheModule, ...providers],
})
export class SharedModule {}
