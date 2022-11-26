import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServeStatInfo } from './serve.class';
import { SysServeService } from './serve.service';
import { ApiResult } from '@/common/decorators/api-result.decorator';
import { AllowAnonPermission } from '@/common/decorators';

@ApiTags('服务监控')
@ApiExtraModels(ServeStatInfo)
@Controller('serve')
@UseInterceptors(CacheInterceptor)
@CacheKey('serve_stat')
@CacheTTL(10)
export class SysServeController {
  constructor(private serveService: SysServeService) {}

  @Get('stat')
  @ApiOperation({ summary: '获取服务器运行信息' })
  @ApiResult({ type: ServeStatInfo })
  @AllowAnonPermission()
  async stat(): Promise<ServeStatInfo> {
    return await this.serveService.getServeStat();
  }
}
