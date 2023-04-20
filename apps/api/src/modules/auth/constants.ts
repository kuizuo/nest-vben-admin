export const IS_PUBLIC_KEY = 'is_public';
export const ALLOW_ANON_KEY = 'allow_anon_permission';

export const AuthStrategy = {
  LOCAL: 'local',
  LOCAL_EMAIL: 'local_email',
  LOCAL_PHONE: 'local_phone',

  JWT: 'jwt',

  GITHUB: 'github',
} as const;
