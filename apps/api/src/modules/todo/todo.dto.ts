import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { PageOptionsDto } from '@/common/dto/page-options.dto';

export class TodoDto {
  @ApiProperty({ description: '名称' })
  @IsString()
  value: string;
}

export class TodoQueryDto extends PageOptionsDto<TodoDto> {}
