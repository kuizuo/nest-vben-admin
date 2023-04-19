import { registerAs } from '@nestjs/config';

import { env, envNumber } from '@/config/env';

export const redis = registerAs('redis', () => ({
  host: env('REDIS_HOST', '127.0.0.1'),
  port: envNumber('REDIS_PORT', 6379),
  password: env('REDIS_PASSWORD'),
  db: envNumber('REDIS_DB'),
}));

export type IRedisConfig = ReturnType<typeof redis>;
