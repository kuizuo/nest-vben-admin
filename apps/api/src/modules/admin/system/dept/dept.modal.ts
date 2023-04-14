import { ApiProperty } from '@nestjs/swagger';
import { SysDept } from '@/entities/admin/sys-dept.entity';

export class DeptDetailInfo extends SysDept {
  @ApiProperty({ description: '所属父级部门' })
  parent?: SysDept;
}

export class DeptTree {
  @ApiProperty({ description: '部门ID' })
  id: number;

  @ApiProperty({ description: '部门名称' })
  name: string;

  @ApiProperty({ description: '子部门' })
  children?: DeptTree[];
}
