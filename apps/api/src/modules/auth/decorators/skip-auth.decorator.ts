import { SetMetadata } from '@nestjs/common';

export const SKIP_AUTH_DECORATOR_KEY = 'decorator:skip-auth';

/**
 * @description 开放授权Api，使用该注解则无需校验Token及权限
 */
export const SkipAuth = () => SetMetadata(SKIP_AUTH_DECORATOR_KEY, true);
