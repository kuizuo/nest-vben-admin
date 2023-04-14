import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { isEmpty } from 'lodash';
import { PageOptionDto } from '@/common/paginate.dto';
import { IsEntityExist } from '@/common/constraints/entity-exist.constraint';
import { SysUser } from '@/entities/admin/sys-user.entity';
import { IsUnique } from '@/common/constraints/unique.constraint';

export class UserInfoUpdateDto {
  @ApiProperty({ description: '用户呢称' })
  @IsOptional()
  @IsString()
  nickName: string;

  @ApiProperty({ description: '用户邮箱' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '用户QQ' })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]+$/)
  @MinLength(5)
  @MaxLength(11)
  qq: string;

  @ApiProperty({ description: '用户手机号' })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({ description: '用户头像' })
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiProperty({ description: '用户备注' })
  @IsOptional()
  @IsString()
  remark: string;
}

export class PasswordUpdateDto {
  @ApiProperty({ description: '旧密码' })
  @IsString()
  @Matches(/^[a-z0-9A-Z\W_]+$/)
  @MinLength(6)
  @MaxLength(20)
  oldPassword: string;

  @ApiProperty({ description: '新密码' })
  @Matches(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Za-z])\S*$/, {
    message: '密码必须包含数字、字母，长度为6-16',
  })
  newPassword: string;
}

export class UserCreateDto {
  @ApiProperty({ description: '登录账号', example: 'kz-admin' })
  // @IsUnique(SysUser, { message: '该用户名已被注册' })
  @IsString()
  @Matches(/^[a-z0-9A-Z\W_]+$/)
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({ description: '登录密码', example: 'a123456' })
  @IsOptional()
  @Matches(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Za-z])\S*$/, {
    message: '密码必须包含数字、字母，长度为6-16',
  })
  password: string;

  @ApiProperty({ description: '归属角色', type: [Number] })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  roles: number[];

  @ApiProperty({ description: '呢称', example: 'kz-admin' })
  @IsOptional()
  @IsString()
  nickName: string;

  @ApiProperty({ description: '邮箱', example: 'hi@kuizuo.cn' })
  @IsUnique(SysUser, { message: '邮箱已被注册' })
  @IsEmail()
  @ValidateIf((o) => !isEmpty(o.email))
  email: string;

  @ApiProperty({ description: '手机号' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'QQ' })
  @IsOptional()
  @IsString()
  @Matches(/^[1-9][0-9]{4,10}$/)
  @MinLength(5)
  @MaxLength(11)
  qq?: string;

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string;

  @ApiProperty({ description: '状态' })
  @IsIn([0, 1])
  status: number;

  @ApiProperty({ description: '部门ID' })
  @Type(() => Number)
  @IsInt()
  deptId: number;
}

export class UserUpdateDto extends PartialType(UserCreateDto) {
  @ApiProperty({ description: '用户ID' })
  @IsInt()
  id: number;
}

export class UserInfoDto {
  @ApiProperty({ description: '用户ID' })
  @IsEntityExist(SysUser, { message: '用户不存在' })
  @IsInt()
  @Type(() => Number)
  id: number;
}

export class UserDeleteDto {
  @ApiProperty({ description: '需要删除的用户ID列表', type: [Number] })
  @IsArray()
  @ArrayNotEmpty()
  ids: number[];
}

export class UserPageDto extends PageOptionDto {
  @ApiProperty({ description: '用户名' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ description: '昵称' })
  @IsOptional()
  @IsString()
  nickName?: string;

  @ApiProperty({ description: 'qq' })
  @IsOptional()
  @IsString()
  @Matches(/^[1-9][0-9]{4,10}$/)
  @MinLength(5)
  @MaxLength(11)
  qq?: string;

  @ApiProperty({ description: '邮箱' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: '状态' })
  @IsOptional()
  @IsIn([0, 1])
  @Type(() => Number)
  status?: number;

  @ApiProperty({ description: '部门ID' })
  @Type(() => Number)
  @IsInt()
  deptId: number;
}

export class UserPasswordDto {
  @ApiProperty({ description: '管理员/用户ID' })
  @IsEntityExist(SysUser, { message: '用户不存在' })
  @IsInt()
  id: number;

  @ApiProperty({ description: '更改后的密码' })
  @Matches(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Za-z])\S*$/, {
    message: '密码格式不正确',
  })
  password: string;
}

export class UserExistDto {
  @ApiProperty({ description: '登录账号' })
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]{4,16}$/)
  @MinLength(6)
  @MaxLength(20)
  username: string;
}
