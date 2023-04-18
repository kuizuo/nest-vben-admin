import { ApiProperty } from '@nestjs/swagger';
import { DeptEntity } from './dept.entity';

export class DeptDetailInfo extends DeptEntity {
  @ApiProperty({ description: '所属父级部门' })
  parent?: DeptEntity;
}

export class DeptTree {
  @ApiProperty({ description: '部门ID' })
  id: number;

  @ApiProperty({ description: '部门名称' })
  name: string;

  @ApiProperty({ description: '子部门' })
  children?: DeptTree[];
}
