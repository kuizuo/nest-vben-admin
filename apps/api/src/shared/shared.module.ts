import { RedisModule } from '@liaoliaots/nestjs-redis'
import { HttpModule } from '@nestjs/axios'
import { CacheModule } from '@nestjs/cache-manager'
import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { MailerModule } from '@nestjs-modules/mailer'

import { IMailerConfig, IRedisConfig } from '@/config'

import { IpService } from './ip/ip.service'
import { LoggerModule } from './logger/logger.module'
import { MailerService } from './mailer/mailer.service'
import { QQService } from './qq/qq.service'

const providers = [MailerService, IpService, QQService]

@Global()
@Module({
  imports: [
    // logger
    LoggerModule,
    // http
    HttpModule,
    // redis cache
    CacheModule.register({
      isGlobal: true,
      // store: redisStore,

      // host: 'localhost',
      // port: 6379,
    }),
    // rate limit
    ThrottlerModule.forRoot([
      {
        limit: 3,
        ttl: 60000,
      },
    ]),
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
