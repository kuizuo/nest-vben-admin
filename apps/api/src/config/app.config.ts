import { ConfigType, registerAs } from '@nestjs/config';

import { env, envNumber } from '@/global/env';

export const AppConfig = registerAs('app', () => ({
  name: env('APP_NAME'),
  port: envNumber('APP_PORT', 3000),
  globalPrefix: env('GLOBAL_PREFIX'),
  adminRoleId: envNumber('ADMIN_ROLE_ID', 1),
  userPwdSalt: env('USER_PWD_SALT', ''),
  userDefaultPwd: env('USER_DEFAULT_PWD', 'a123456'),
  locale: env('APP_LOCALE', 'zh-CN'),

  logger: {
    level: env('LOGGER_LEVEL'),
    maxFiles: envNumber('LOGGER_MAX_FILES'),
  },
}));

export type IAppConfig = ConfigType<typeof AppConfig>;
