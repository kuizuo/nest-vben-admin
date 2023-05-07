import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ErrorEnum } from '@/constants/error';
import { ApiResult } from '@/decorators/api-result.decorator';
import { IdParam } from '@/decorators/id-param.decorator';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { ApiException } from '@/exceptions/api.exception';
import { AuthUser } from '@/modules/auth/decorators';
import { Permission } from '@/modules/rbac/decorators';
import { DeptEntity } from '@/modules/system/dept/dept.entity';

import { DeptDto, DeptQueryDto } from './dept.dto';
import { DeptService } from './dept.service';
import { PermissionDept } from './permission';

@ApiSecurityAuth()
@ApiTags('System - 部门模块')
@Controller('depts')
export class DeptController {
  constructor(private deptService: DeptService) {}

  @Get()
  @ApiOperation({ summary: '获取部门列表' })
  @ApiResult({ type: [DeptEntity] })
  @Permission(PermissionDept.LIST)
  async list(
    @Query() dto: DeptQueryDto,
    @AuthUser('uid') uid: number,
  ): Promise<DeptEntity[]> {
    return this.deptService.getDeptTree(uid, dto);
  }

  @Post()
  @ApiOperation({ summary: '创建部门' })
  @Permission(PermissionDept.CREATE)
  async create(@Body() dto: DeptDto): Promise<void> {
    await this.deptService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '查询部门信息' })
  @Permission(PermissionDept.READ)
  async info(@IdParam() id: number) {
    return this.deptService.info(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新部门' })
  @Permission(PermissionDept.UPDATE)
  async update(
    @IdParam() id: number,
    @Body() updateDeptDto: DeptDto,
  ): Promise<void> {
    await this.deptService.update(id, updateDeptDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除部门' })
  @Permission(PermissionDept.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    // 查询是否有关联用户或者部门，如果含有则无法删除
    const count = await this.deptService.countUserByDeptId(id);
    if (count > 0) throw new ApiException(ErrorEnum.CODE_1009);

    const count2 = await this.deptService.countChildDept(id);

    if (count2 > 0) throw new ApiException(ErrorEnum.CODE_1015);

    await this.deptService.delete(id);
  }

  // @Post('move')
  // @ApiOperation({ summary: '部门移动排序' })
  // async move(@Body() dto: MoveDeptDto): Promise<void> {
  //   await this.deptService.move(dto.depts);
  // }
}
