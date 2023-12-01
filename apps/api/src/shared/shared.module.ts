import { HttpModule } from '@nestjs/axios'
import { CacheModule } from '@nestjs/cache-manager'
import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { MailerModule } from '@nestjs-modules/mailer'

import { LoggerModule } from './logger/logger.module'
import { MailerService } from './mailer/mailer.service'
import { QQService } from './qq/qq.service'
import { IMailerConfig } from '@/config'
import { RedisModule } from './redis/redis.module'
import { ScheduleModule } from '@nestjs/schedule'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { isDev } from '@/global/env'

const providers = [MailerService, QQService]

@Global()
@Module({
  imports: [
    // logger
    LoggerModule,
    // http
    HttpModule,
    // schedule
    ScheduleModule.forRoot(),
    // rate limit
    ThrottlerModule.forRoot([
      {
        limit: 3,
        ttl: 60000,
      },
    ]),
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 20,
      verboseMemoryLeak: isDev,
      ignoreErrors: false,
    }),
    // redis
    RedisModule,
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
  exports: [HttpModule, RedisModule, ...providers],
})
export class SharedModule {}
