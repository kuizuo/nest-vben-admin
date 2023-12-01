import type { RedisKeys } from '~/constants/cache.constant'

type Prefix = 'admin'
const prefix = 'admin'

export function getRedisKey<T extends string = RedisKeys | '*'>(key: T, ...concatKeys: string[]): `${Prefix}:${T}${string | ''}` {
  return `${prefix}:${key}${
    concatKeys && concatKeys.length ? `:${concatKeys.join('_')}` : ''
  }`
}
