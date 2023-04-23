export const PermissionUser = {
  LIST: 'system:user:list',
  CREATE: 'system:user:create',
  READ: 'system:user:read',
  UPDATE: 'system:user:update',
  DELETE: 'system:user:delete',

  PASSWORD_UPDATE: 'system:user:password:update',
  PASSWORD_RESET: 'system:user:pass:reset',
} as const;
