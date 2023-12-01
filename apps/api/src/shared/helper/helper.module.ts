import { Global, Module, type Provider } from '@nestjs/common'

import { CronService } from './cron.service'
import { SmsService } from './sms.service'
import { QQService } from './qq.service'

const providers: Provider[] = [
  CronService,
  SmsService,
  QQService,
]

@Global()
@Module({
  imports: [],
  providers,
  exports: providers,
})
export class HelperModule {}
