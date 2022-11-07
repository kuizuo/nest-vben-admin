import { ApiProperty } from '@nestjs/swagger';
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
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { isEmpty } from 'lodash';
import { PaginateDto } from '@/common/dto/page.dto';

export class UserInfoUpdateDto {
  @ApiProperty({ description: '用户呢称' })
  @IsString()
  @IsOptional()
  nickName: string;

  @ApiProperty({ description: '用户邮箱' })
  @IsEmail()
  @ValidateIf((o) => !isEmpty(o.email))
  email: string;

  @ApiProperty({ description: '用户QQ' })
  @IsString()
  @Matches(/^[0-9]+$/)
  @MinLength(5)
  @MaxLength(11)
  @IsOptional()
  qq: string;

  @ApiProperty({ description: '用户手机号' })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ description: '用户头像' })
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty({ description: '用户备注' })
  @IsString()
  @IsOptional()
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
  @IsString()
  @Matches(/^[a-z0-9A-Z\W_]+$/)
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({ description: '登录密码', example: 'a123456' })
  @Matches(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Za-z])\S*$/, {
    message: '密码必须包含数字、字母，长度为6-16',
  })
  @IsOptional()
  password: string;

  @ApiProperty({ description: '归属角色', type: [Number] })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  roles: number[];

  @ApiProperty({ description: '呢称', example: 'kz-admin' })
  @IsString()
  @IsOptional()
  nickName: string;

  @ApiProperty({ description: '邮箱', example: 'hi@kuizuo.cn' })
  @IsEmail()
  @ValidateIf((o) => !isEmpty(o.email))
  email: string;

  @ApiProperty({ description: '手机号' })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ description: 'QQ' })
  @IsString()
  @Matches(/^[1-9][0-9]{4,10}$/)
  @MinLength(5)
  @MaxLength(11)
  @IsOptional()
  qq: string;

  @ApiProperty({ description: '备注' })
  @IsString()
  @IsOptional()
  remark: string;

  @ApiProperty({ description: '状态' })
  @IsIn([0, 1])
  status: number;
}

export class UserUpdateDto extends UserCreateDto {
  @ApiProperty({ description: '用户ID' })
  @IsInt()
  @Min(0)
  id: number;
}

export class UserInfoDto {
  @ApiProperty({ description: '用户ID' })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  id: number;
}

export class UserDeleteDto {
  @ApiProperty({ description: '需要删除的用户ID列表', type: [Number] })
  @IsArray()
  @ArrayNotEmpty()
  ids: number[];
}

export class UserPageDto extends PaginateDto {
  @ApiProperty({ description: '用户名' })
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty({ description: '昵称' })
  @IsString()
  @IsOptional()
  nickName: string;

  @ApiProperty({ description: 'qq' })
  @IsString()
  @Matches(/^[1-9][0-9]{4,10}$/)
  @MinLength(5)
  @MaxLength(11)
  @IsOptional()
  qq: string;

  @ApiProperty({ description: '邮箱' })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({ description: '状态' })
  @IsOptional()
  status: number;
}

export class UserPasswordDto {
  @ApiProperty({ description: '管理员ID' })
  @IsInt()
  @Min(0)
  id: number;

  @ApiProperty({ description: '更改后的密码' })
  @Matches(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Za-z])\S*$/, { message: '密码格式不正确' })
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
