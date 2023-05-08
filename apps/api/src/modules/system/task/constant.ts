export const PermissionTask = {
  LIST: 'system:task:list',
  CREATE: 'system:task:create',
  READ: 'system:task:read',
  UPDATE: 'system:task:update',
  DELETE: 'system:task:delete',

  ONCE: 'system:task:once',
  START: 'system:task:start',
  STOP: 'system:task:stop',
} as const;

export enum TaskStatus {
  Disabled = 0,
  Activited = 1,
}

export enum TaskType {
  Cron = 0,
  Interval = 1,
}
