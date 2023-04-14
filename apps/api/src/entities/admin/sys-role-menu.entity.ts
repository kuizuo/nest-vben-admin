import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from '../../common/abstract.entity';

@Entity({ name: 'sys_role_menu' })
export class SysRoleMenu extends AbstractEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'role_id' })
  @ApiProperty({ description: '角色ID' })
  roleId: number;

  @Column({ name: 'menu_id' })
  @ApiProperty({ description: '菜单ID' })
  menuId: number;
}
