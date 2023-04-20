import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '@/modules/system/user/entities/user.entity';

import { RefreshTokenEntity } from './refresh-token.entity';

/**
 * 用户认证token模型
 */
@Entity('user_access_tokens')
export class AccessTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /**
   * @description 令牌字符串
   * @type {string}
   */
  @Column({ length: 500 })
  value!: string;

  @Column({
    comment: '令牌过期时间',
  })
  expired_at!: Date;

  @CreateDateColumn({
    comment: '令牌创建时间',
  })
  createdAt!: Date;

  /**
   * @description 关联的刷新令牌
   * @type {RefreshTokenEntity}
   */
  @OneToOne(
    () => RefreshTokenEntity,
    (refreshToken) => refreshToken.accessToken,
    {
      cascade: true,
    },
  )
  refreshToken!: RefreshTokenEntity;

  /**
   * @description 所属用户
   * @type {UserEntity}
   */
  @ManyToOne(() => UserEntity, (user) => user.accessTokens, {
    onDelete: 'CASCADE',
  })
  user!: UserEntity;
}
