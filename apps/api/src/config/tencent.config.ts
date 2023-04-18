import { registerAs } from '@nestjs/config';

import { env } from '@/helper/config';

export const tencent = registerAs('tencent', () => ({
  secretId: env('TENCENT_SECRET_ID'),
  secretKey: env('TENCENT_SECRET_KEY'),
}));

export type ITencentConfig = ReturnType<typeof tencent>;
