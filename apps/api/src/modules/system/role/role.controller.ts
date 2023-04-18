import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolePageDto } from './role.dto';
import { Pagination } from '@/helper/paginate/pagination';
import { RoleEntity } from '@/modules/system/role/entities/role.entity';
import { RoleService } from './role.service';
import {
  RoleCreateDto,
  RoleDeleteDto,
  RoleInfoDto,
  RoleUpdateDto,
} from './role.dto';
import { ApiException } from '@/exceptions/api.exception';
import { MenuService } from '../menu/menu.service';
import { ApiResult } from '@/decorators/api-result.decorator';
import { ErrorEnum } from '@/constants/error';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';

@ApiTags('System - 角色模块')
@ApiSecurityAuth()
@Controller('role')
export class RoleController {
  constructor(
    private roleService: RoleService,
    private menuService: MenuService,
  ) {}

  @ApiOperation({ summary: '获取角色列表' })
  @ApiResult({ type: [RoleEntity] })
  @Get('list')
  async list(): Promise<RoleEntity[]> {
    return await this.roleService.list();
  }

  @ApiOperation({ summary: '分页查询角色信息' })
  @ApiResult({ type: [RoleEntity] })
  @Get('page')
  async page(@Query() dto: RolePageDto): Promise<Pagination<RoleEntity>> {
    return await this.roleService.page(dto);
  }

  @ApiOperation({ summary: '获取角色信息' })
  @Get('info')
  async info(@Query() dto: RoleInfoDto) {
    return await this.roleService.info(dto.id);
  }

  @ApiOperation({ summary: '新增角色' })
  @Post('add')
  async add(@Body() dto: RoleCreateDto): Promise<void> {
    await this.roleService.create(dto);
  }

  @ApiOperation({ summary: '更新角色' })
  @Post('update')
  async update(@Body() dto: RoleUpdateDto): Promise<void> {
    await this.roleService.update(dto);
    await this.menuService.refreshOnlineUserPerms();
  }

  @ApiOperation({ summary: '删除角色' })
  @Post('delete')
  async delete(@Body() dto: RoleDeleteDto): Promise<void> {
    const count = await this.roleService.countUserIdByRole(dto.ids);
    if (count > 0) {
      throw new ApiException(ErrorEnum.CODE_1008);
    }
    await this.roleService.delete(dto.ids);
    await this.menuService.refreshOnlineUserPerms();
  }
}
