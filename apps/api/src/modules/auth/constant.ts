export const IS_PUBLIC_KEY = 'is_public'

export const PERMISSION_KEY = 'permission'

export const POLICY_KEY = 'policy'

export const ALLOW_ANON_KEY = 'allow_anon_permission'

export const AuthStrategy = {
  LOCAL: 'local',
  LOCAL_EMAIL: 'local_email',
  LOCAL_PHONE: 'local_phone',

  JWT: 'jwt',

  GITHUB: 'github',
  GOOGLE: 'google',

  PDD: 'pdd',
} as const

export const Roles = {
  ADMIN: 'admin',
  USER: 'user',
} as const

export type Role = (typeof Roles)[keyof typeof Roles]
