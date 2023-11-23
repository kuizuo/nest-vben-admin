import { SetMetadata, applyDecorators } from '@nestjs/common'

import { PERMISSION_KEY } from '../constant'

export function Permission(permission: string | string[]) {
  return applyDecorators(SetMetadata(PERMISSION_KEY, permission))
}
