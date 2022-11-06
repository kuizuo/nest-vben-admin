import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ADMIN_USER } from '@/modules/admin/admin.constants';

/**
 * @description 获取当前登录用户信息, 并挂载到request上
 */
export const AdminUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  // auth guard will mount this
  const user = request[ADMIN_USER];

  return data ? user?.[data] : user;
});
