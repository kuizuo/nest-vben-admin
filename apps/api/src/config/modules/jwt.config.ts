import { registerAs } from '@nestjs/config';

import { env, envNumber } from '@/config/env';

export const jwt = registerAs('jwt', () => ({
  secret: env('JWT_SECRET'),
  expires: envNumber('JWT_EXPIRES'),
  refreshSecret: env('REFRESH_TOKEN_SECRET'),
  refreshExpires: envNumber('REFRESH_TOKEN_EXPIRES'),
}));

export type IJwtConfig = ReturnType<typeof jwt>;
