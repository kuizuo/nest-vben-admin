import { registerAs } from '@nestjs/config';

import { env } from '@/config/env';

export const sms = registerAs('sms', () => ({
  sign: env('SMS_SING', 'Youni'),
  region: env('SMS_REGION', 'ap-guangzhou'),
  appid: env('SMS_APPID', '1400437232'),
  secretId: env('SMS_SECRET_ID', 'your-secret-id'),
  secretKey: env('SMS_SECRET_KEY', 'your-secret-key'),
}));

export type ISmsConfig = ReturnType<typeof sms>;
