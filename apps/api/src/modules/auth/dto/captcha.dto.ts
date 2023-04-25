import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsMobilePhone,
  IsOptional,
  IsString,
} from 'class-validator';

import { ErrorEnum } from '@/constants/error';

export class ImageCaptchaDto {
  @ApiProperty({
    required: false,
    default: 100,
    description: '验证码宽度',
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly width: number = 100;

  @ApiProperty({
    required: false,
    default: 50,
    description: '验证码宽度',
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly height: number = 50;
}

export class SendEmailCodeDto {
  @ApiProperty({ description: '邮箱' })
  @IsEmail({ message: ErrorEnum.CODE_1025 })
  email: string;
}

export class SendSmsCodeDto {
  @ApiProperty({ description: '手机号' })
  @IsMobilePhone('zh-CN', { message: ErrorEnum.CODE_1026 })
  phone: string;
}

export class CheckCodeDto {
  @ApiProperty({ description: '手机号/邮箱' })
  @IsString()
  account: string;

  @ApiProperty({ description: '验证码' })
  @IsString()
  code: string;
}
