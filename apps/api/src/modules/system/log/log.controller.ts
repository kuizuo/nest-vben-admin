import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiResult } from '@/decorators';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { Pagination } from '@/helper/paginate/pagination';

import {
  CaptchaLogQueryDto,
  LoginLogQueryDto,
  TaskLogQueryDto,
} from './dtos/log.dto';
import { CaptchaLogEntity } from './entities/captcha-log.entity';
import { LoginLogInfo, TaskLogInfo } from './log.modal';
import { CaptchaLogService } from './services/captcha-log.service';
import { LoginLogService } from './services/login-log.service';
import { TaskLogService } from './services/task-log.service';

@ApiSecurityAuth()
@ApiTags('System - 日志模块')
@Controller('log')
export class LogController {
  constructor(
    private loginLogService: LoginLogService,
    private taskService: TaskLogService,
    private captchaLogService: CaptchaLogService,
  ) {}

  @ApiOperation({ summary: '分页查询登录日志' })
  @ApiResult({ type: [LoginLogInfo], isPage: true })
  @Get('login/page')
  async loginLogPage(
    @Query() dto: LoginLogQueryDto,
  ): Promise<Pagination<LoginLogInfo>> {
    return this.loginLogService.paginate(dto);
  }

  @ApiOperation({ summary: '分页查询任务日志' })
  @ApiResult({ type: [TaskLogInfo], isPage: true })
  @Get('task/page')
  async taskPage(
    @Query() dto: TaskLogQueryDto,
  ): Promise<Pagination<TaskLogInfo>> {
    return this.taskService.paginate(dto);
  }

  @ApiOperation({ summary: '分页查询验证码日志' })
  @ApiResult({ type: [CaptchaLogEntity], isPage: true })
  @Get('captcha/page')
  async captchaPage(
    @Query() dto: CaptchaLogQueryDto,
  ): Promise<Pagination<CaptchaLogEntity>> {
    return this.captchaLogService.paginate(dto);
  }
}
