import { registerAs } from '@nestjs/config';

import { env, envNumber } from '@/helper/config';

export const jwt = registerAs('jwt', () => ({
  secret: env('TOKEN_SECRET'),
  expires: envNumber('TOKEN_EXPIRES'),
  refreshSecret: env('REFRESH_TOKEN_SECRET'),
  refreshExpires: envNumber('REFRESH_TOKEN_EXPIRES'),
}));

export type IJwtConfig = ReturnType<typeof jwt>;
