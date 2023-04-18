import { registerAs } from '@nestjs/config';

import { env, envNumber } from '@/helper/config';

export const app = registerAs('app', () => ({
  name: env('APP_NAME'),
  port: envNumber('PORT', 3000),
  globalPrefix: env('GLOBAL_PREFIX'),
  rootRoleId: envNumber('ROOT_ROLE_ID'),
  userPwdSalt: env('USER_PWD_SALT'),
  userDefaultPwd: env('USER_DEFAULT_PWD'),
  protectSysPermMenuMaxId: envNumber('PROTECT_SYS_PERMMENU_MAX_ID'),
  protectSysDictionaryMaxId: envNumber('PROTECT_SYS_DICTIONARY_MAX_ID'),
  locale: env('APP_LOCALE', 'zh-CN'),

  logger: {
    level: env('LOGGER_LEVEL'),
    maxFiles: envNumber('LOGGER_MAX_FILES'),
  },
}));

export type IAppConfig = ReturnType<typeof app>;
