import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResult } from '@/decorators/api-result.decorator';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';

import {
  UserCreateDto,
  UserDeleteDto,
  UserInfoDto,
  UserPageDto,
  UserPasswordDto,
  UserUpdateDto,
} from './user.dto';
import { UserInfoPage } from './user.modal';
import { UserService } from './user.service';
import { MenuService } from '../menu/menu.service';
import { Pagination } from '@/helper/paginate/pagination';

@ApiTags('System - 用户模块')
@ApiSecurityAuth()
@ApiExtraModels(UserInfoPage)
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private menuService: MenuService,
  ) {}

  @Post('add')
  @ApiOperation({ summary: '新增用户' })
  async add(@Body() dto: UserCreateDto): Promise<void> {
    await this.userService.add(dto);
  }

  @Get('info')
  @ApiOperation({ summary: '查询用户信息' })
  async info(@Query() dto: UserInfoDto) {
    return await this.userService.info(dto.id);
  }

  @Post('delete')
  @ApiOperation({ summary: '根据ID删除用户' })
  async delete(@Body() dto: UserDeleteDto): Promise<void> {
    await this.userService.delete(dto.ids);
    await this.userService.multiForbidden(dto.ids);
  }

  @Get('list')
  @ApiOperation({ summary: '获取用户列表' })
  @ApiResult({ type: [UserInfoPage] })
  async list(@Query() dto: UserPageDto): Promise<Pagination<UserInfoPage>> {
    return await this.userService.page(dto);
  }

  @Post('update')
  @ApiOperation({ summary: '更新用户信息' })
  async update(@Body() dto: UserUpdateDto): Promise<void> {
    await this.userService.update(dto);
    await this.menuService.refreshPerms(dto.id);
  }

  @Post('password')
  @ApiOperation({ summary: '更改指定用户密码' })
  async password(@Body() dto: UserPasswordDto): Promise<void> {
    await this.userService.forceUpdatePassword(dto.id, dto.password);
  }
}
