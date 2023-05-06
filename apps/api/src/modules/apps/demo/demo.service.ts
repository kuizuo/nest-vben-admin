import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ErrorEnum } from '@/constants/error';
import { ApiException } from '@/exceptions/api.exception';
import { paginate } from '@/helper/paginate';
import { Pagination } from '@/helper/paginate/pagination';
import { DemoEntity } from '@/modules/apps/demo/demo.entity';

import { DemoDto, DemoPageDto } from './demo.dto';

@Injectable()
export class DemoService {
  constructor(
    @InjectRepository(DemoEntity)
    private testRepo: Repository<DemoEntity>,
  ) {}

  async list(): Promise<DemoEntity[]> {
    return this.testRepo.find();
  }

  async page({ page, pageSize }: DemoPageDto): Promise<Pagination<DemoEntity>> {
    return paginate(this.testRepo, { page, pageSize });
  }

  async detail(id: number): Promise<DemoEntity> {
    const item = await this.testRepo.findOneBy({ id });
    if (!item) throw new ApiException(ErrorEnum.CODE_2004);

    return item;
  }

  async create(dto: DemoDto) {
    let test = new DemoEntity();
    test = Object.assign(dto);

    await this.testRepo.save(test);
  }

  async update(id: number, { ...data }: DemoDto) {
    await this.testRepo.update(id, data);
  }

  async delete(id: number) {
    const item = await this.detail(id);

    await this.testRepo.remove(item);
  }
}
