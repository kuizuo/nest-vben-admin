export const PERMISSION_KEY = 'permission';

export const POLICY_KEY = 'policy';

export const ALLOW_ANON_KEY = 'allow_anon_permission';

export const Roles = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
