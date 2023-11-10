import { applyDecorators, SetMetadata } from '@nestjs/common'

import { PERMISSION_KEY } from '../constant'

export const Permission = (permission: string | string[]) => {
  return applyDecorators(SetMetadata(PERMISSION_KEY, permission))
}
