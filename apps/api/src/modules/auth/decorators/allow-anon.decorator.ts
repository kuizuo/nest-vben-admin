import { SetMetadata } from '@nestjs/common'

import { ALLOW_ANON_KEY } from '../constant'

/**
 * 当接口不需要检测用户是否具有操作权限时添加该装饰器
 */
export const AllowAnon = () => SetMetadata(ALLOW_ANON_KEY, true)
