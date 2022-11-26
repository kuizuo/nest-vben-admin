import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { PageResult } from '@/common/class/res.class';
import { LogDisabled } from '@/common/decorators/log-disabled.decorator';
import { LoginLogInfo, TaskLogInfo } from './log.class';
import { SysLogService } from './log.service';
import { LoginLogPageDto, TaskLogPageDto } from './log.dto';
import { ApiResult } from '@/common/decorators/api-result.decorator';

@ApiTags('日志模块')
@ApiExtraModels(LoginLogInfo, TaskLogInfo)
@Controller('log')
export class SysLogController {
  constructor(private logService: SysLogService) {}

  @ApiOperation({ summary: '分页查询登录日志' })
  @ApiResult({ type: [LoginLogInfo], struct: 'page' })
  @LogDisabled()
  @Get('login/page')
  async loginLogPage(
    @Query() dto: LoginLogPageDto,
  ): Promise<PageResult<LoginLogInfo>> {
    const items = await this.logService.pageGetLoginLog(dto);
    const count = await this.logService.countLoginLog();
    return {
      items,
      total: count,
    };
  }

  @ApiOperation({ summary: '分页查询任务日志' })
  @ApiResult({ type: [TaskLogInfo], struct: 'page' })
  @LogDisabled()
  @Get('task/page')
  async taskPage(
    @Query() dto: TaskLogPageDto,
  ): Promise<PageResult<TaskLogInfo>> {
    const items = await this.logService.page(dto.page - 1, dto.pageSize);
    const count = await this.logService.countTaskLog();
    return {
      items,
      total: count,
    };
  }
}
