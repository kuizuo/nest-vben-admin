import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from '@/modules/system/menu/menu.entity';
import { RoleEntity } from '@/modules/system/role/entities/role.entity';
import { TaskEntity } from '@/modules/system/task/task.entity';
import { UserEntity } from '@/modules/system/user/entities/user.entity';
import { DeptEntity } from '@/modules/system/dept/dept.entity';
import { ConfigEntity } from '@/modules/system/param-config/config.entity';

import { LogController } from './log/log.controller';
import { MenuEntityController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { DeptController } from './dept/dept.controller';
import { DeptService } from './dept/dept.service';
import { BullModule } from '@nestjs/bull';
import { WSModule } from '@/modules/ws/ws.module';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TaskConsumer } from './task/task.processor';
import { OnlineController } from './online/online.controller';
import { OnlineService } from './online/online.service';
import { ParamConfigController } from './param-config/param-config.controller';
import { ParamConfigService } from './param-config/param-config.service';
import { ServeController } from './serve/serve.controller';
import { ServeService } from './serve/serve.service';
import { SYS_TASK_QUEUE_NAME, SYS_TASK_QUEUE_PREFIX } from '@/constants/task';
import { LoginLogEntity } from './log/entities/login-log.entity';
import { TaskLogEntity } from './log/entities/task-log.entity';
import { ConfigService } from '@nestjs/config';
import { IRedisConfig } from '@/config';
import { LogModule } from './log/log.module';
import { UserModule } from './user/user.module';
import { AuthModule } from '../auth/auth.module';

const controllers = [
  // UserController,
  RoleController,
  MenuEntityController,
  DeptController,
  LogController,
  TaskController,
  OnlineController,
  ParamConfigController,
  ServeController,
];

const services = [
  UserService,
  RoleService,
  MenuService,
  DeptService,
  TaskService,
  TaskConsumer,
  OnlineService,
  ParamConfigService,
  ServeService,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      MenuEntity,
      DeptEntity,
      LoginLogEntity,
      TaskEntity,
      TaskLogEntity,
      ConfigEntity,
    ]),
    BullModule.registerQueueAsync({
      name: SYS_TASK_QUEUE_NAME,
      useFactory: (configService: ConfigService) => ({
        redis: configService.get<IRedisConfig>('redis'),
        prefix: SYS_TASK_QUEUE_PREFIX,
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => WSModule),
    forwardRef(() => AuthModule),
    UserModule,
    LogModule,
  ],
  controllers,
  providers: [...services],
  exports: [TypeOrmModule, ...services],
})
export class SystemModule {}
