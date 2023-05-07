import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

import { AbstractEntity } from '@/common/entity/abstract.entity';

import { UserEntity } from '../user/entities/user.entity';

@Entity({ name: 'sys_dept' })
@Tree('materialized-path')
export class DeptEntity extends AbstractEntity {
  @Column()
  @ApiProperty({ description: '部门名称' })
  name: string;

  @Column({ nullable: true, default: 0 })
  @ApiProperty({ description: '排序' })
  orderNo: number;

  @TreeChildren({ cascade: true })
  children!: DeptEntity[];

  @TreeParent({ onDelete: 'SET NULL' })
  parent?: DeptEntity | null;

  @OneToMany(() => UserEntity, (user) => user.dept)
  users: UserEntity[];
}
