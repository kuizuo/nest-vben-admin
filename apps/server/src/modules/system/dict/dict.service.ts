import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { BusinessException } from '@server/common/exceptions/biz.exception'
import { ErrorEnum } from '@server/constants/error-code.constant'
import { paginate } from '@server/helper/paginate'
import { Pagination } from '@server/helper/paginate/pagination'
import { DictEntity } from '@server/modules/system/dict/dict.entity'

import { DictDto, DictQueryDto } from './dict.dto'

@Injectable()
export class DictService {
  constructor(
    @InjectRepository(DictEntity)
    private dictRepository: Repository<DictEntity>,
  ) { }

  /**
   * 罗列所有配置
   */
  async page({
    page,
    pageSize,
    name,
  }: DictQueryDto): Promise<Pagination<DictEntity>> {
    const queryBuilder = this.dictRepository.createQueryBuilder('dict')

    if (name) {
      queryBuilder.where('dict.name LIKE :name', {
        name: `%${name}%`,
      })
    }

    return paginate(queryBuilder, { page, pageSize })
  }

  /**
   * 获取参数总数
   */
  async countConfigList(): Promise<number> {
    return this.dictRepository.count()
  }

  /**
   * 新增
   */
  async create(dto: DictDto): Promise<void> {
    await this.dictRepository.insert(dto)
  }

  /**
   * 更新
   */
  async update(id: number, dto: Partial<DictDto>): Promise<void> {
    await this.dictRepository.update(id, dto)
  }

  /**
   * 删除
   */
  async delete(id: number): Promise<void> {
    await this.dictRepository.delete(id)
  }

  /**
   * 查询单个
   */
  async findOne(id: number): Promise<DictEntity> {
    return this.dictRepository.findOneBy({ id })
  }

  async isExistKey(key: string): Promise<void | never> {
    const result = await this.dictRepository.findOneBy({ key })
    if (result)
      throw new BusinessException(ErrorEnum.PARAMETER_CONFIG_KEY_EXISTS)
  }

  async findValueByKey(key: string): Promise<string | null> {
    const result = await this.dictRepository.findOne({
      where: { key },
      select: ['value'],
    })
    if (result)
      return result.value

    return null
  }
}
