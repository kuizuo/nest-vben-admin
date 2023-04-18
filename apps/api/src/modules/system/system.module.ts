import { Module, forwardRef } from '@nestjs/common';

import { WSModule } from '@/modules/ws/ws.module';

import { LogModule } from './log/log.module';
import { UserModule } from './user/user.module';
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';
import { DeptModule } from './dept/dept.module';
import { DictModule } from './dict/dict.module';
import { TaskModule } from './task/task.module';
import { OnlineModule } from './online/online.module';
import { ServeModule } from './serve/serve.module';

const modules = [
  UserModule,
  RoleModule,
  MenuModule,
  DeptModule,
  DictModule,
  LogModule,
  TaskModule,
  OnlineModule,
  ServeModule,
];

@Module({
  imports: [
    forwardRef(() => WSModule),
    forwardRef(() => AuthModule),
    ...modules,
  ],
  exports: [...modules],
})
export class SystemModule {}
