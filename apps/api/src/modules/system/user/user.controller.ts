import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { IdParam } from '@/decorators/id-param.decorator';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { Permission } from '@/modules/rbac/decorators';
import { MenuService } from '@/modules/system/menu/menu.service';

import { UserPasswordDto } from './dto/password.dto';
import { UserDto, UserListDto } from './dto/user.dto';
import { PermissionUser } from './permission';
import { UserService } from './user.service';

@ApiTags('System - 用户模块')
@ApiSecurityAuth()
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private menuService: MenuService,
  ) {}

  @Get()
  @ApiOperation({ summary: '获取用户列表' })
  @Permission(PermissionUser.LIST)
  async list(@Query() dto: UserListDto) {
    return this.userService.findAll(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '查询用户' })
  @Permission(PermissionUser.READ)
  async read(@IdParam() id: number) {
    return this.userService.info(id);
  }

  @Post()
  @ApiOperation({ summary: '新增用户' })
  @Permission(PermissionUser.CREATE)
  async create(@Body() dto: UserDto): Promise<void> {
    await this.userService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户' })
  @Permission(PermissionUser.UPDATE)
  async update(
    @IdParam() id: number,
    @Body() dto: Partial<UserDto>,
  ): Promise<void> {
    await this.userService.update(id, dto);
    await this.menuService.refreshPerms(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @Permission(PermissionUser.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.userService.delete([id]);
    await this.userService.multiForbidden([id]);
  }

  @Post(':id/password')
  @ApiOperation({ summary: '更改用户密码' })
  @Patch(PermissionUser.PASSWORD_UPDATE)
  async password(@Body() dto: UserPasswordDto): Promise<void> {
    await this.userService.forceUpdatePassword(dto.id, dto.password);
  }
}
