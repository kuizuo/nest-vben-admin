import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as config from '@/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: [...Object.values(config)],
    }),
  ],
})
export class AppConfigModule {}
