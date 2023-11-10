import { Body, Controller, Get, Post, Query, Delete, Put } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '@/common/decorators/api-result.decorator'
import { IdParam } from '@/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '@/common/decorators/swagger.decorator'
import { BusinessException } from '@/common/exceptions/biz.exception'
import { ErrorEnum } from '@/constants/error-code.constant'
import { AuthUser } from '@/modules/auth/decorators/auth-user.decorator'
import { Permission } from '@/modules/auth/decorators/permission.decorator'
import { DeptEntity } from '@/modules/system/dept/dept.entity'

import { DeptDto, DeptQueryDto } from './dept.dto'
import { DeptService } from './dept.service'

export const Permissions = {
  LIST: 'system:dept:list',
  CREATE: 'system:dept:create',
  READ: 'system:dept:read',
  UPDATE: 'system:dept:update',
  DELETE: 'system:dept:delete',
} as const

@ApiSecurityAuth()
@ApiTags('System - 部门模块')
@Controller('depts')
export class DeptController {
  constructor(private deptService: DeptService) {}

  @Get()
  @ApiOperation({ summary: '获取部门列表' })
  @ApiResult({ type: [DeptEntity] })
  @Permission(Permissions.LIST)
  async list(
    @Query() dto: DeptQueryDto,
    @AuthUser('uid') uid: number,
  ): Promise<DeptEntity[]> {
    return this.deptService.getDeptTree(uid, dto)
  }

  @Post()
  @ApiOperation({ summary: '创建部门' })
  @Permission(Permissions.CREATE)
  async create(@Body() dto: DeptDto): Promise<void> {
    await this.deptService.create(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询部门信息' })
  @Permission(Permissions.READ)
  async info(@IdParam() id: number) {
    return this.deptService.info(id)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新部门' })
  @Permission(Permissions.UPDATE)
  async update(
    @IdParam() id: number,
    @Body() updateDeptDto: DeptDto,
  ): Promise<void> {
    await this.deptService.update(id, updateDeptDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除部门' })
  @Permission(Permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    // 查询是否有关联用户或者部门，如果含有则无法删除
    const count = await this.deptService.countUserByDeptId(id)
    if (count > 0)
      throw new BusinessException(ErrorEnum.DEPARTMENT_HAS_ASSOCIATED_USERS)

    const count2 = await this.deptService.countChildDept(id)

    if (count2 > 0)
      throw new BusinessException(ErrorEnum.DEPARTMENT_HAS_CHILD_DEPARTMENTS)

    await this.deptService.delete(id)
  }

  // @Post('move')
  // @ApiOperation({ summary: '部门移动排序' })
  // async move(@Body() dto: MoveDeptDto): Promise<void> {
  //   await this.deptService.move(dto.depts);
  // }
}
