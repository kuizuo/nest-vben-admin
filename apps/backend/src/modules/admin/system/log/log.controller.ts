import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PageResult } from '@/common/class/res.class';
import { ADMIN_PREFIX } from '../../admin.constants';
import { LogDisabled } from '../../core/decorators/log-disabled.decorator';
import { LoginLogInfo, TaskLogInfo } from './log.class';
import { SysLogService } from './log.service';
import { PageSearchLoginLogDto, PageSearchTaskLogDto } from './log.dto';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('日志模块')
@Controller('log')
export class SysLogController {
  constructor(private logService: SysLogService) {}

  @ApiOperation({ summary: '分页查询登录日志' })
  @ApiOkResponse({ type: [LoginLogInfo] })
  @LogDisabled()
  @Get('login/page')
  async loginLogPage(@Query() dto: PageSearchLoginLogDto): Promise<PageResult<LoginLogInfo>> {
    const items = await this.logService.pageGetLoginLog(dto);
    const count = await this.logService.countLoginLog();
    return {
      items,
      total: count,
    };
  }

  @ApiOperation({ summary: '分页查询任务日志' })
  @ApiOkResponse({ type: [TaskLogInfo] })
  @LogDisabled()
  @Get('task/page')
  async taskPage(@Query() dto: PageSearchTaskLogDto): Promise<PageResult<TaskLogInfo>> {
    const items = await this.logService.page(dto.page - 1, dto.pageSize);
    const count = await this.logService.countTaskLog();
    return {
      items,
      total: count,
    };
  }
}
