import { Column, Entity, Tree, TreeChildren, TreeParent } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from '@/common/abstract.entity';

@Entity({ name: 'sys_dept' })
@Tree('materialized-path')
export class SysDept extends AbstractEntity {
  @Column()
  @ApiProperty({ description: '部门名称' })
  name: string;

  @Column({ nullable: true, default: 0 })
  @ApiProperty({ description: '排序' })
  orderNo: number;

  @TreeChildren({ cascade: true })
  children!: SysDept[];

  @TreeParent({ onDelete: 'SET NULL' })
  parent?: SysDept | null;
}
