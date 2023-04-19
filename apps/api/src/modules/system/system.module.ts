import { Module } from '@nestjs/common';

import { DeptModule } from './dept/dept.module';
import { DictModule } from './dict/dict.module';
import { LogModule } from './log/log.module';
import { MenuModule } from './menu/menu.module';
import { OnlineModule } from './online/online.module';
import { RoleModule } from './role/role.module';
import { ServeModule } from './serve/serve.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

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
    // forwardRef(() => WSModule),
    // forwardRef(() => AuthModule),
    ...modules,
  ],
  exports: [...modules],
})
export class SystemModule {}
