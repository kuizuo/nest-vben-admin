import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ErrorEnum } from '@/constants/error';
import { ApiResult } from '@/decorators/api-result.decorator';
import { AuthUser } from '@/decorators/auth-user.decorator';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { ApiException } from '@/exceptions/api.exception';
import { DeptEntity } from '@/modules/system/dept/dept.entity';

import {
  DeptCreateDto,
  DeptDeleteDto,
  InfoDeptDto,
  MoveDeptDto,
  DeptUpdateDto,
  DeptListDto,
} from './dept.dto';
import { DeptDetailInfo, DeptTree } from './dept.model';
import { DeptService } from './dept.service';

@ApiSecurityAuth()
@ApiTags('System - 部门模块')
@ApiExtraModels(DeptDetailInfo)
@Controller('dept')
export class DeptController {
  constructor(private deptService: DeptService) {}

  @Get('list')
  @ApiOperation({ summary: '获取部门列表' })
  @ApiResult({ type: [DeptEntity] })
  async list(
    @AuthUser('uid') uid: number,
    @Query() dto: DeptListDto,
  ): Promise<DeptTree[]> {
    return this.deptService.getDeptTree(uid, dto);
  }

  @Post('add')
  @ApiOperation({ summary: '创建部门' })
  async add(@Body() createDeptDto: DeptCreateDto): Promise<void> {
    await this.deptService.add(createDeptDto);
  }

  @Post('delete')
  @ApiOperation({ summary: '删除部门' })
  async delete(@Body() deleteDeptDto: DeptDeleteDto): Promise<void> {
    // 查询是否有关联用户或者部门，如果含有则无法删除
    const count = await this.deptService.countUserByDeptId(
      deleteDeptDto.deptId,
    );
    if (count > 0) throw new ApiException(ErrorEnum.CODE_1009);

    const count2 = await this.deptService.countChildDept(deleteDeptDto.deptId);

    if (count2 > 0) throw new ApiException(ErrorEnum.CODE_1015);

    await this.deptService.delete(deleteDeptDto.deptId);
  }

  @Get('info')
  @ApiOperation({ summary: '查询单个部门信息' })
  @ApiResult({ type: DeptDetailInfo })
  async info(@Query() infoDeptDto: InfoDeptDto): Promise<DeptDetailInfo> {
    return this.deptService.info(infoDeptDto.deptId);
  }

  @Post('update')
  @ApiOperation({ summary: '更新部门' })
  async update(@Body() updateDeptDto: DeptUpdateDto): Promise<void> {
    await this.deptService.update(updateDeptDto);
  }

  @Post('move')
  @ApiOperation({ summary: '部门移动排序' })
  async move(@Body() dto: MoveDeptDto): Promise<void> {
    await this.deptService.move(dto.depts);
  }
}
