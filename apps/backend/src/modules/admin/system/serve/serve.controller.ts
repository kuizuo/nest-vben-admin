import { CacheInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ADMIN_PREFIX } from '../../admin.constants';
import { PermissionOptional } from '@/common/decorators/permission-optional.decorator';
import { ServeStatInfo } from './serve.class';
import { SysServeService } from './serve.service';
import { ApiResult } from '@/common/decorators/api-result.decorator';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('服务监控')
@ApiExtraModels(ServeStatInfo)
@Controller('serve')
@UseInterceptors(CacheInterceptor)
export class SysServeController {
  constructor(private serveService: SysServeService) {}

  @Get('stat')
  @ApiOperation({ summary: '获取服务器运行信息' })
  @ApiResult({ type: ServeStatInfo })
  @PermissionOptional()
  async stat(): Promise<ServeStatInfo> {
    return await this.serveService.getServeStat();
  }
}
