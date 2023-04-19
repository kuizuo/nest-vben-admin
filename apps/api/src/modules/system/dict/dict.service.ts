import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ErrorEnum } from '@/constants/error';
import { ApiException } from '@/exceptions/api.exception';
import { paginate } from '@/helper/paginate';
import { Pagination } from '@/helper/paginate/pagination';
import { DictEntity } from '@/modules/system/dict/dict.entity';

import { DictCreateDto, DictUpdateDto } from './dict.dto';

@Injectable()
export class DictService {
  constructor(
    @InjectRepository(DictEntity)
    private dictRepository: Repository<DictEntity>,
  ) {}

  /**
   * 罗列所有配置
   */
  async page(page: number, pageSize: number): Promise<Pagination<DictEntity>> {
    return paginate(this.dictRepository, { page, pageSize });
  }

  /**
   * 获取参数总数
   */
  async countConfigList(): Promise<number> {
    return this.dictRepository.count();
  }

  /**
   * 新增
   */
  async add(dto: DictCreateDto): Promise<void> {
    await this.dictRepository.insert(dto);
  }

  /**
   * 更新
   */
  async update(dto: DictUpdateDto): Promise<void> {
    await this.dictRepository.update(
      { id: dto.id },
      { name: dto.name, value: dto.value, remark: dto.remark },
    );
  }

  /**
   * 删除
   */
  async delete(ids: number[]): Promise<void> {
    await this.dictRepository.delete(ids);
  }

  /**
   * 查询单个
   */
  async findOne(id: number): Promise<DictEntity> {
    return this.dictRepository.findOneBy({ id });
  }

  async isExistKey(key: string): Promise<void | never> {
    const result = await this.dictRepository.findOneBy({ key });
    if (result) {
      throw new ApiException(ErrorEnum.CODE_1021);
    }
  }

  async findValueByKey(key: string): Promise<string | null> {
    const result = await this.dictRepository.findOne({
      where: { key },
      select: ['value'],
    });
    if (result) {
      return result.value;
    }
    return null;
  }
}
