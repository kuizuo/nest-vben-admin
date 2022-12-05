import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiException } from '@/common/exceptions/api.exception';
import { SysDept } from '@/entities/admin/sys-dept.entity';
import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { DeptDetailInfo, DeptTree } from './dept.modal';
import {
  DeptCreateDto,
  DeptDeleteDto,
  InfoDeptDto,
  MoveDeptDto,
  TransferDeptDto,
  DeptUpdateDto,
  DeptListDto,
} from './dept.dto';
import { SysDeptService } from './dept.service';
import { ApiResult } from '@/common/decorators/api-result.decorator';
import { ErrorEnum } from '@/common/constants/error';
import { ApiSecurityAuth } from '@/common/decorators/swagger.decorator';

@ApiSecurityAuth()
@ApiTags('System - 部门模块')
@ApiExtraModels(DeptDetailInfo)
@Controller('dept')
export class SysDeptController {
  constructor(private deptService: SysDeptService) {}

  @Get('list')
  @ApiOperation({ summary: '获取部门列表' })
  @ApiResult({ type: [SysDept] })
  async list(
    @AuthUser('uid') uid: number,
    @Query() dto: DeptListDto,
  ): Promise<DeptTree[]> {
    return await this.deptService.getDeptTree(uid, dto);
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

    const count2 = await this.deptService.countRoleByDeptId(
      deleteDeptDto.deptId,
    );
    if (count2 > 0) throw new ApiException(ErrorEnum.CODE_1010);

    const count3 = await this.deptService.countChildDept(deleteDeptDto.deptId);

    if (count3 > 0) throw new ApiException(ErrorEnum.CODE_1015);

    await this.deptService.delete(deleteDeptDto.deptId);
  }

  @Get('info')
  @ApiOperation({ summary: '查询单个部门信息' })
  @ApiResult({ type: DeptDetailInfo })
  async info(@Query() infoDeptDto: InfoDeptDto): Promise<DeptDetailInfo> {
    return await this.deptService.info(infoDeptDto.deptId);
  }

  @Post('update')
  @ApiOperation({ summary: '更新部门' })
  async update(@Body() updateDeptDto: DeptUpdateDto): Promise<void> {
    await this.deptService.update(updateDeptDto);
  }

  @Post('transfer')
  @ApiOperation({ summary: '管理员部门转移' })
  async transfer(@Body() transferDeptDto: TransferDeptDto): Promise<void> {
    await this.deptService.transfer(
      transferDeptDto.userIds,
      transferDeptDto.deptId,
    );
  }

  @Post('move')
  @ApiOperation({ summary: '部门移动排序' })
  async move(@Body() dto: MoveDeptDto): Promise<void> {
    await this.deptService.move(dto.depts);
  }
}
