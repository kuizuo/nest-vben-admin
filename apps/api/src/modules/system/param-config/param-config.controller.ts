import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pagination } from '@/helper/paginate/pagination';
import { PageOptionsDto } from '@/common/dto/page-options.dto';
import { ConfigEntity } from '@/modules/system/param-config/config.entity';
import {
  ParamConfigCreateDto,
  ParamConfigDeleteDto,
  ParamConfigInfoDto,
  ParamConfigUpdateDto,
} from './param-config.dto';
import { ParamConfigService } from './param-config.service';
import { ApiResult } from '@/decorators/api-result.decorator';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';

@ApiTags('System - 参数配置模块')
@ApiSecurityAuth()
@Controller('param-config')
export class ParamConfigController {
  constructor(private paramConfigService: ParamConfigService) {}

  @ApiOperation({ summary: '分页获取参数配置列表' })
  @ApiResult({ type: [ConfigEntity] })
  @Get('page')
  async page(@Query() dto: PageOptionsDto): Promise<Pagination<ConfigEntity>> {
    return await this.paramConfigService.page(dto.page, dto.pageSize);
  }

  @ApiOperation({ summary: '新增参数配置' })
  @Post('add')
  async add(@Body() dto: ParamConfigCreateDto): Promise<void> {
    await this.paramConfigService.isExistKey(dto.key);
    await this.paramConfigService.add(dto);
  }

  @ApiOperation({ summary: '查询单个参数配置信息' })
  @ApiResult({ type: ConfigEntity })
  @Get('info')
  async info(@Query() dto: ParamConfigInfoDto): Promise<ConfigEntity> {
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
