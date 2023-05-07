import { Exclude } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { AbstractEntity } from '@/common/entity/abstract.entity';

import { AccessTokenEntity } from '@/modules/auth/entities/access-token.entity';

import { DeptEntity } from '../../dept/dept.entity';
import { RoleEntity } from '../../role/role.entity';

@Entity({ name: 'sys_user' })
export class UserEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ length: 32 })
  psalt: string;

  @Column({ name: 'nick_name', nullable: true })
  nickname: string;

  @Column({ name: 'avatar', nullable: true })
  avatar: string;

  @Column({ nullable: true })
  qq: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  remark: string;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  status: number;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable()
  roles: RoleEntity[];

  @ManyToOne(() => DeptEntity, (dept) => dept.users)
  @JoinColumn()
  dept: DeptEntity;

  @OneToMany(() => AccessTokenEntity, (accessToken) => accessToken.user, {
    cascade: true,
  })
  accessTokens: AccessTokenEntity[];
}
