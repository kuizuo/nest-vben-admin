import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SYS_TASK_QUEUE_NAME, SYS_TASK_QUEUE_PREFIX } from '@/modules/admin/admin.constants';
import { SysLoginLog } from '@/entities/admin/sys-login-log.entity';
import { SysMenu } from '@/entities/admin/sys-menu.entity';
import { SysRoleMenu } from '@/entities/admin/sys-role-menu.entity';
import { SysRole } from '@/entities/admin/sys-role.entity';
import { SysTaskLog } from '@/entities/admin/sys-task-log.entity';
import { SysTask } from '@/entities/admin/sys-task.entity';
import { SysUserRole } from '@/entities/admin/sys-user-role.entity';
import { SysUser } from '@/entities/admin/sys-user.entity';
import { SysConfig } from '@/entities/admin/sys-config.entity';
import { SysLogController } from './log/log.controller';
import { SysLogService } from './log/log.service';
import { SysMenuController } from './menu/menu.controller';
import { SysMenuService } from './menu/menu.service';
import { SysRoleController } from './role/role.controller';
import { SysRoleService } from './role/role.service';
import { SysUserController } from './user/user.controller';
import { SysUserService } from './user/user.service';
import { BullModule } from '@nestjs/bull';
import { SysTaskController } from './task/task.controller';
import { SysTaskService } from './task/task.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from '@/shared/services/app/app-config.service';
import { SysTaskConsumer } from './task/task.processor';
import { SysOnlineController } from './online/online.controller';
import { SysOnlineService } from './online/online.service';
import { WSModule } from '@/modules/ws/ws.module';
import { SysParamConfigController } from './param-config/param-config.controller';
import { SysParamConfigService } from './param-config/param-config.service';
import { SysServeController } from './serve/serve.controller';
import { SysServeService } from './serve/serve.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SysUser,
      SysUserRole,
      SysMenu,
      SysRoleMenu,
      SysRole,
      SysLoginLog,
      SysTask,
      SysTaskLog,
      SysConfig,
    ]),
    BullModule.registerQueueAsync({
      name: SYS_TASK_QUEUE_NAME,
      imports: [ConfigModule],
      useFactory: (configService: AppConfigService) => ({
        redis: configService.redisConfig,
        prefix: SYS_TASK_QUEUE_PREFIX,
      }),
      inject: [AppConfigService],
    }),
    WSModule,
  ],
  controllers: [
    SysUserController,
    SysRoleController,
    SysMenuController,
    SysLogController,
    SysTaskController,
    SysOnlineController,
    SysParamConfigController,
    SysServeController,
  ],
  providers: [
    SysUserService,
    SysRoleService,
    SysMenuService,
    SysLogService,
    SysTaskService,
    SysTaskConsumer,
    SysOnlineService,
    SysParamConfigService,
    SysServeService,
  ],
  exports: [
    TypeOrmModule,
    SysUserService,
    SysMenuService,
    SysLogService,
    SysOnlineService,
    SysParamConfigService,
  ],
})
export class SystemModule {}
