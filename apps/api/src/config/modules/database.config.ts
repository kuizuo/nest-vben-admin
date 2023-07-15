import { registerAs } from '@nestjs/config';

import { DataSource, DataSourceOptions } from 'typeorm';

import { env, envBoolean, envNumber } from '@/config/env';

// eslint-disable-next-line import/order
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: env('DB_HOST', '127.0.0.1'),
  port: envNumber('DB_PORT', 3306),
  username: env('DB_USERNAME'),
  password: env('DB_PASSWORD'),
  database: env('DB_DATABASE'),
  synchronize: envBoolean('DB_SYNCHRONIZE', false),
  entities: ['dist/modules/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  subscribers: ['dist/modules/**/*.subscriber{.ts,.js}'],
};

export const database = registerAs(
  'database',
  (): DataSourceOptions => dataSourceOptions,
);

export type IDatabaseConfig = ReturnType<typeof database>;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
