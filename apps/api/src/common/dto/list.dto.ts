import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { PageOptionsDto } from './page-options.dto';

export class ListDTO<T = Record<string, any>> extends PageOptionsDto<T> {
  @ApiPropertyOptional({
    example: {
      field1: 'this is a string',
      field2: false,
      field3: 123,
    },
  })
  @IsOptional()
  query?: Partial<T> = {};
}
