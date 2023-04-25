import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AccountUpdateDto {
  @ApiProperty({ description: '用户呢称' })
  @IsString()
  @IsOptional()
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

export class ResetPasswordDto {
  @ApiProperty({ description: '临时token', example: 'uuid' })
  @IsString()
  accessToken: string;

  @ApiProperty({ description: '密码', example: 'a123456' })
  @IsString()
  @Matches(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Za-z])\S*$/)
  @MinLength(6)
  password: string;
}
