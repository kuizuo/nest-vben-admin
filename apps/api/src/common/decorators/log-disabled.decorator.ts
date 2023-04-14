import { SetMetadata } from '@nestjs/common';

export const LOG_DISABLED_DECORATOR_KEY = 'decorator:log_disabled';
/**
 * @description 日志记录禁用
 */
export const LogDisabled = () => SetMetadata(LOG_DISABLED_DECORATOR_KEY, true);
