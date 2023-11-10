import { applyDecorators, SetMetadata } from '@nestjs/common'

import { ObjectType } from 'typeorm'

import { POLICY_KEY } from '../constant'

export type Condition<T = any> = (item: T, user: IAuthUser) => boolean

export type ResourceObject = { entity: ObjectType<any>; condition: Condition }

export const Resource = <T = ObjectType<any>>(
  entity: T,
  condition?: Condition,
) => {
  return applyDecorators(SetMetadata(POLICY_KEY, { entity, condition }))
}
