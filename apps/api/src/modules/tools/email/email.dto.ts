import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * 发送邮件
 */
export class EmailSendDto {
  @ApiProperty({ description: '收件人邮箱' })
  @IsString()
  to: string;

  @ApiProperty({ description: '标题' })
  @IsString()
  subject: number;

  @ApiProperty({ description: '正文' })
  @IsString()
  content: string;
}
