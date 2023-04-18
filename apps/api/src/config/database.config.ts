import { registerAs } from '@nestjs/config';

import { env, envBoolean, envNumber } from '@/helper/config';

export const database = registerAs('database', () => ({
  type: 'mysql',
  host: env('DB_HOST', '127.0.0.1'),
  port: envNumber('DB_PORT', 3306),
  username: env('DB_USERNAME'),
  password: env('DB_PASSWORD'),
  database: env('DB_DATABASE'),
  synchronize: envBoolean('DB_SYNCHRONIZE', false),
  autoLoadEntities: true,
}));

export type IDatabaseConfig = ReturnType<typeof database>;
