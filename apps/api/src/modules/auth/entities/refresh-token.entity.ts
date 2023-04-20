import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AccessTokenEntity } from './access-token.entity';
/**
 * 刷新Token的Token模型
 */
@Entity('user_refresh_tokens')
export class RefreshTokenEntity extends BaseEntity {
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
   * @description 关联的登录令牌
   * @type {AccessTokenEntity}
   */
  @OneToOne(
    () => AccessTokenEntity,
    (accessToken) => accessToken.refreshToken,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  accessToken!: AccessTokenEntity;
}
