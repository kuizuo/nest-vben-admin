import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'

import { RefreshTokenEntity } from './refresh-token.entity'
import { UserEntity } from '@/modules/user/entities/user.entity'

/**
 * 用户认证token模型
 */
@Entity('user_access_tokens')
export class AccessTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  /**
   * @description 令牌字符串
   * @type {string}
   */
  @Column({ length: 500 })
  value!: string

  @Column({
    comment: '令牌过期时间',
  })
  expired_at!: Date

  @CreateDateColumn({
    comment: '令牌创建时间',
  })
  created_at!: Date

  /**
   * @description 关联的刷新令牌
   * @type {RefreshTokenEntity}
   */
  @OneToOne(
    () => RefreshTokenEntity,
    refreshToken => refreshToken.accessToken,
    {
      cascade: true,
    },
  )
  refreshToken!: Relation<RefreshTokenEntity>

  /**
   * @description 所属用户
   * @type {UserEntity}
   */
  @ManyToOne(() => UserEntity, user => user.accessTokens, {
    onDelete: 'CASCADE',
  })
  user!: Relation<UserEntity>
}
