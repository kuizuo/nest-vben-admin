import { SetMetadata, applyDecorators } from '@nestjs/common'

import { ObjectType } from 'typeorm'

import { POLICY_KEY } from '../constant'

export type Condition<T = any> = (item: T, user: IAuthUser) => boolean

export interface ResourceObject { entity: ObjectType<any>, condition: Condition }

export function Resource<T = ObjectType<any>>(entity: T, condition?: Condition) {
  return applyDecorators(SetMetadata(POLICY_KEY, { entity, condition }))
}
