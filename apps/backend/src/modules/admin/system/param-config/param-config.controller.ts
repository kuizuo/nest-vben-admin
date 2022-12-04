import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageRespData } from '@/common/response.modal';
import { PageOptionDto } from '@/common/paginate.dto';
import { SysConfig } from '@/entities/admin/sys-config.entity';
import {
  ParamConfigCreateDto,
  ParamConfigDeleteDto,
  ParamConfigInfoDto,
  ParamConfigUpdateDto,
} from './param-config.dto';
import { SysParamConfigService } from './param-config.service';
import { ApiResult } from '@/common/decorators/api-result.decorator';
import { ApiSecurityAuth } from '@/common/decorators/swagger.decorator';

@ApiTags('System - 参数配置模块')
@ApiSecurityAuth()
@Controller('param-config')
export class SysParamConfigController {
  constructor(private paramConfigService: SysParamConfigService) {}

  @ApiOperation({ summary: '分页获取参数配置列表' })
  @ApiResult({ type: [SysConfig] })
  @Get('page')
  async page(@Query() dto: PageOptionDto): Promise<PageRespData<SysConfig>> {
    const items = await this.paramConfigService.getConfigListByPage(
      dto.page - 1,
      dto.pageSize,
    );
    const count = await this.paramConfigService.countConfigList();
    return {
      items,
      total: count,
    };
  }

  @ApiOperation({ summary: '新增参数配置' })
  @Post('add')
  async add(@Body() dto: ParamConfigCreateDto): Promise<void> {
    await this.paramConfigService.isExistKey(dto.key);
    await this.paramConfigService.add(dto);
  }

  @ApiOperation({ summary: '查询单个参数配置信息' })
  @ApiResult({ type: SysConfig })
  @Get('info')
  async info(@Query() dto: ParamConfigInfoDto): Promise<SysConfig> {
    return this.paramConfigService.findOne(dto.id);
  }

  @ApiOperation({ summary: '更新单个参数配置' })
  @Post('update')
  async update(@Body() dto: ParamConfigUpdateDto): Promise<void> {
    await this.paramConfigService.update(dto);
  }

  @ApiOperation({ summary: '删除指定的参数配置' })
  @Post('delete')
  async delete(@Body() dto: ParamConfigDeleteDto): Promise<void> {
    await this.paramConfigService.delete(dto.ids);
  }
}
