import { registerAs } from '@nestjs/config';

import { env, envBoolean } from '@/config/env';

export const swagger = registerAs('swagger', () => ({
  enable: envBoolean('SWAGGER_ENABLE'),
  path: env('SWAGGER_PATH'),
}));

export type ISwaggerConfig = ReturnType<typeof swagger>;
