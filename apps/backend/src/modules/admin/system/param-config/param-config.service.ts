import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiException } from '@/common/exceptions/api.exception';
import { SysConfig } from '@/entities/admin/sys-config.entity';
import { Repository } from 'typeorm';
import { ParamConfigCreateDto, ParamConfigUpdateDto } from './param-config.dto';
import { ErrorEnum } from '@/common/constants/error';

@Injectable()
export class SysParamConfigService {
  constructor(
    @InjectRepository(SysConfig)
    private configRepo: Repository<SysConfig>,
  ) {}

  /**
   * 罗列所有配置
   */
  async getConfigListByPage(page: number, count: number): Promise<SysConfig[]> {
    return this.configRepo.find({
      order: {
        id: 'ASC',
      },
      take: count,
      skip: page * count,
    });
  }

  /**
   * 获取参数总数
   */
  async countConfigList(): Promise<number> {
    return this.configRepo.count();
  }

  /**
   * 新增
   */
  async add(dto: ParamConfigCreateDto): Promise<void> {
    await this.configRepo.insert(dto);
  }

  /**
   * 更新
   */
  async update(dto: ParamConfigUpdateDto): Promise<void> {
    await this.configRepo.update(
      { id: dto.id },
      { name: dto.name, value: dto.value, remark: dto.remark },
    );
  }

  /**
   * 删除
   */
  async delete(ids: number[]): Promise<void> {
    await this.configRepo.delete(ids);
  }

  /**
   * 查询单个
   */
  async findOne(id: number): Promise<SysConfig> {
    return await this.configRepo.findOneBy({ id });
  }

  async isExistKey(key: string): Promise<void | never> {
    const result = await this.configRepo.findOneBy({ key });
    if (result) {
      throw new ApiException(ErrorEnum.CODE_1021);
    }
  }

  async findValueByKey(key: string): Promise<string | null> {
    const result = await this.configRepo.findOne({
      where: { key },
      select: ['value'],
    });
    if (result) {
      return result.value;
    }
    return null;
  }
}
