---
to: src/modules/apps/<%= name %>/<%= name %>.controller.ts
---
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { <%= Name %>Service } from './<%= name %>.service';
import {
  <%= Name %>CreateDto,
  <%= Name %>UpdateDto,
  <%= Name %>DeleteDto,
  <%= Name %>DetailDto,
  <%= Name %>PageDto,
} from './<%= name %>.dto';
import <%= Name %> from '@/entities/apps/<%= name %>.entity';
import { ApiResult } from '@/common/decorators/api-result.decorator';
import { PageResult } from '@/common/class/res.class';

@ApiTags('<%= Name %>模块')
@ApiExtraModels(<%= Name %>)
@Controller('<%= name %>')
export class <%= Name %>Controller {
  constructor(private readonly <%= name %>Service: <%= Name %>Service) {}

  @Get('list')
  @ApiOperation({ summary: '获取<%= Name %>列表' })
  @ApiResult({ type: [<%= Name %>] })
  async list(): Promise<<%= Name %>[]> {
    return await this.<%= name %>Service.list();
  }

  @Get('page')
  @ApiOperation({ summary: '分页获取<%= Name %>列表' })
  @ApiResult({ type: [<%= Name %>], struct: 'page' })
  async page(@Query() dto: <%= Name %>PageDto): Promise<PageResult<<%= Name %>>> {
    return await this.<%= name %>Service.page(dto);
  }

  @Get('detail')
  @ApiOperation({ summary: '获取<%= Name %>详情' })
  @ApiResult({ type: <%= Name %> })
  async detail(@Query() dto: <%= Name %>DetailDto): Promise<<%= Name %>> {
    return await this.<%= name %>Service.detail(dto.id);
  }

  @Post('create')
  @ApiOperation({ summary: '创建<%= Name %>' })
  async create(@Body() dto: <%= Name %>CreateDto): Promise<void> {
    await this.<%= name %>Service.create(dto);
  }

  @Post('update')
  @ApiOperation({ summary: '更新<%= Name %>' })
  async update(@Body() dto: <%= Name %>UpdateDto): Promise<void> {
    await this.<%= name %>Service.update(dto);
  }

  @Post('delete')
  @ApiOperation({ summary: '删除<%= Name %>' })
  async delete(@Body() dto: <%= Name %>DeleteDto): Promise<void> {
    await this.<%= name %>Service.delete(dto.id);
  }
}
