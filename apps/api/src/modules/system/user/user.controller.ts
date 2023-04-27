import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Patch,
  Query,
  Param,
} from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiResult } from '@/decorators/api-result.decorator';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { Pagination } from '@/helper/paginate/pagination';
import { Permission } from '@/modules/rbac/decorators';
import { MenuService } from '@/modules/system/menu/menu.service';

import { UserPasswordDto } from './dto/password.dto';
import { UserCreateDto, UserListDto, UserUpdateDto } from './dto/user.dto';
import { PermissionUser } from './permission';
import { UserInfoPage } from './user.modal';
import { UserService } from './user.service';

@ApiTags('System - 用户模块')
@ApiSecurityAuth()
@ApiExtraModels(UserInfoPage)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private menuService: MenuService,
  ) {}

  @Get('list')
  @ApiOperation({ summary: '获取用户列表' })
  @ApiResult({ type: [UserInfoPage] })
  @Permission(PermissionUser.LIST)
  async list(@Query() dto: UserListDto): Promise<Pagination<UserInfoPage>> {
    return this.userService.findAll(dto);
  }

  @Post()
  @ApiOperation({ summary: '新增用户' })
  @Permission(PermissionUser.CREATE)
  async create(@Body() dto: UserCreateDto): Promise<void> {
    await this.userService.create(dto);
  }

  @Put()
  @ApiOperation({ summary: '更新用户' })
  @Permission(PermissionUser.UPDATE)
  async update(@Body() dto: UserUpdateDto): Promise<void> {
    await this.userService.update(dto);
    await this.menuService.refreshPerms(dto.id);
  }

  @Get(':id')
  @ApiOperation({ summary: '查询用户' })
  @Permission(PermissionUser.READ)
  async detail(@Param('id') id: number) {
    return this.userService.info(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @Permission(PermissionUser.DELETE)
  async delete(@Param('id') id: number): Promise<void> {
    await this.userService.delete([id]);
    await this.userService.multiForbidden([id]);
  }

  @Post('password')
  @ApiOperation({ summary: '更改用户密码' })
  @Patch(PermissionUser.PASSWORD_UPDATE)
  async password(@Body() dto: UserPasswordDto): Promise<void> {
    await this.userService.forceUpdatePassword(dto.id, dto.password);
  }
}
