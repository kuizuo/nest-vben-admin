import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { PageOptionDto } from '@/common/paginate.dto';

export class LoginLogPageDto extends PageOptionDto {
  @ApiProperty({ description: '用户名' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ description: '登录IP' })
  @IsString()
  @IsOptional()
  ip?: string;

  @ApiProperty({ description: '登录地点' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: '登录时间' })
  @IsOptional()
  @IsArray()
  time?: string[];
}

export class TaskLogPageDto extends PageOptionDto {
  @ApiProperty({ description: '用户名' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ description: '登录IP' })
  @IsString()
  @IsOptional()
  ip?: string;

  @ApiProperty({ description: '登录时间' })
  @IsOptional()
  @IsArray()
  time?: string[];
}
