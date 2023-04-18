import { PageOptionsDto } from '@/common/dto/page-options.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LoginLogQueryDto extends PageOptionsDto  {
  @ApiProperty({ description: '用户名' })
  @IsOptional()
  @IsString()
  username: string;

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
  time?: string[];
}

export class TaskLogQueryDto extends PageOptionsDto  {
  @ApiProperty({ description: '用户名' })
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty({ description: '登录IP' })
  @IsString()
  @IsOptional()
  ip?: string;

  @ApiProperty({ description: '登录时间' })
  @IsOptional()
  time?: string[];
}

export class CaptchaLogQueryDto extends PageOptionsDto  {
  @ApiProperty({ description: '用户名' })
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty({ description: '验证码' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({ description: '发送时间' })
  @IsOptional()
  time?: string[];
}
