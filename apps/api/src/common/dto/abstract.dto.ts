import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, Min } from 'class-validator';

export abstract class AbstractDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  id!: number;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsOptional()
  deleted?: boolean;
}
