import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysLoginLog } from '@/entities/admin/sys-login-log.entity';
import { SysMenu } from '@/entities/admin/sys-menu.entity';
import { SysRoleMenu } from '@/entities/admin/sys-role-menu.entity';
import { SysRole } from '@/entities/admin/sys-role.entity';
import { SysTaskLog } from '@/entities/admin/sys-task-log.entity';
import { SysTask } from '@/entities/admin/sys-task.entity';
import { SysUserRole } from '@/entities/admin/sys-user-role.entity';
import { SysUser } from '@/entities/admin/sys-user.entity';
import { SysRoleDept } from '@/entities/admin/sys-role-dept.entity';
import { SysDept } from '@/entities/admin/sys-dept.entity';
import { SysConfig } from '@/entities/admin/sys-config.entity';

import { SysLogController } from './log/log.controller';
import { SysLogService } from './log/log.service';
import { SysMenuController } from './menu/menu.controller';
import { SysMenuService } from './menu/menu.service';
import { SysRoleController } from './role/role.controller';
import { SysRoleService } from './role/role.service';
import { SysUserController } from './user/user.controller';
import { SysUserService } from './user/user.service';
import { SysDeptController } from './dept/dept.controller';
import { SysDeptService } from './dept/dept.service';
import { BullModule } from '@nestjs/bull';
import { WSModule } from '@/modules/ws/ws.module';
import { SysTaskController } from './task/task.controller';
import { SysTaskService } from './task/task.service';
import { AppConfigService } from '@/shared/services/app/app-config.service';
import { SysTaskConsumer } from './task/task.processor';
import { SysOnlineController } from './online/online.controller';
import { SysOnlineService } from './online/online.service';
import { SysParamConfigController } from './param-config/param-config.controller';
import { SysParamConfigService } from './param-config/param-config.service';
import { SysServeController } from './serve/serve.controller';
import { SysServeService } from './serve/serve.service';
import {
  SYS_TASK_QUEUE_NAME,
  SYS_TASK_QUEUE_PREFIX,
} from '/@/common/constants/task';

const controllers = [
  SysUserController,
  SysRoleController,
  SysMenuController,
  SysDeptController,
  SysLogController,
  SysTaskController,
  SysOnlineController,
  SysParamConfigController,
  SysServeController,
];

const services = [
  SysUserService,
  SysRoleService,
  SysMenuService,
  SysDeptService,
  SysLogService,
  SysTaskService,
  SysTaskConsumer,
  SysOnlineService,
  SysParamConfigService,
  SysServeService,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SysUser,
      SysRole,
      SysUserRole,
      SysMenu,
      SysRoleMenu,
      SysDept,
      SysRoleDept,
      SysLoginLog,
      SysTask,
      SysTaskLog,
      SysConfig,
    ]),
    BullModule.registerQueueAsync({
      name: SYS_TASK_QUEUE_NAME,
      useFactory: (configService: AppConfigService) => ({
        redis: configService.redisConfig,
        prefix: SYS_TASK_QUEUE_PREFIX,
      }),
      inject: [AppConfigService],
    }),
    WSModule,
  ],
  controllers,
  providers: [...services],
  exports: [TypeOrmModule, ...services],
})
export class SystemModule {}
