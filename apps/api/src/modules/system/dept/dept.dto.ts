import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class DeptCreateDto {
  @ApiProperty({ description: '部门名称' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ description: '父级部门id' })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  parentId: number;

  @ApiProperty({ description: '排序编号', required: false })
  @IsInt()
  @Min(0)
  @IsOptional()
  orderNo: number;
}

export class DeptUpdateDto extends DeptCreateDto {
  @ApiProperty({ description: '需要更新的部门id' })
  @IsInt()
  @Min(0)
  id: number;
}

export class DeptDeleteDto {
  @ApiProperty({ description: '删除的系统部门ID' })
  @IsInt()
  @Min(0)
  deptId: number;
}

export class InfoDeptDto {
  @ApiProperty({ description: '查询的系统部门ID' })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  deptId: number;
}

export class TransferDeptDto {
  @ApiProperty({ description: '需要转移的管理员列表编号', type: [Number] })
  @IsArray()
  @ArrayNotEmpty()
  userIds: number[];

  @ApiProperty({ description: '需要转移过去的系统部门ID' })
  @IsInt()
  @Min(0)
  deptId: number;
}

export class MoveDept {
  @ApiProperty({ description: '当前部门ID' })
  @IsInt()
  @Min(0)
  id: number;

  @ApiProperty({ description: '移动到指定父级部门的ID' })
  @IsInt()
  @Min(0)
  @IsOptional()
  parentId: number;
}

export class MoveDeptDto {
  @ApiProperty({ description: '部门列表', type: [MoveDept] })
  @ValidateNested({ each: true })
  @Type(() => MoveDept)
  depts: MoveDept[];
}

export class DeptListDto {
  @ApiProperty({ description: '部门名称' })
  name: string;
}
