import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { PageOptionsDto } from '@/common/dto/page-options.dto';

export class DemoDto {
  @ApiProperty({ description: '名称' })
  @IsString()
  name: string;
}

export class DemoPageDto extends PageOptionsDto<DemoDto> {}
