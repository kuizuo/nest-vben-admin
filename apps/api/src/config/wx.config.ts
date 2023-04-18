import { registerAs } from '@nestjs/config';

import { env } from '@/helper/config';

export const wx = registerAs('wx', () => ({
  appId: env('WX_APP_ID'),
  appSecret: env('WX_APP_SECRET'),
}));

export type IWxConfig = ReturnType<typeof wx>;
