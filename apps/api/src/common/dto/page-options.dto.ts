import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator'

// allow custom order
export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptionsDto<T = any> {
  @ApiProperty({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional({ always: true })
  page?: number = 1

  @ApiProperty({
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional({ always: true })
  pageSize?: number = 10

  @ApiProperty({})
  @IsString()
  @IsOptional()
  field?: keyof T

  @ApiProperty({
    enum: Order,
    default: Order.ASC,
  })
  @IsEnum(Order)
  @IsOptional()
  @Transform(({ value }) => (value === 'ascend' ? Order.ASC : Order.DESC))
  order?: Order = Order.ASC

  @ApiProperty({})
  @Type(() => Number)
  @IsInt()
  @IsOptional({ always: true })
  _t?: number
}
