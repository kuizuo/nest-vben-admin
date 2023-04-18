import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from '@/modules/apps/test/test.entity';
import { TestCreateDto, TestUpdateDto, TestPageDto } from './test.dto';
import { ApiException } from '@/exceptions/api.exception';
import { Pagination } from '@/helper/paginate/pagination';
import { ErrorEnum } from '@/constants/error';
import { paginate } from '@/helper/paginate';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testRepo: Repository<Test>,
  ) {}

  async list(): Promise<Test[]> {
    return await this.testRepo.find();
  }

  async page({ page, pageSize }: TestPageDto): Promise<Pagination<Test>> {
    return paginate(this.testRepo, { page, pageSize });
  }

  async detail(id: number): Promise<Test> {
    const item = await this.testRepo.findOneBy({ id });
    if (!item) throw new ApiException(ErrorEnum.CODE_2004);

    return item;
  }

  async create(dto: TestCreateDto) {
    let test = new Test();
    test = Object.assign(dto);

    await this.testRepo.save(test);
  }

  async update(dto: TestUpdateDto) {
    const item = await this.detail(dto.id);

    const test: Test = Object.assign(item, dto);
    await this.testRepo.save(test);
  }

  async delete(id: number) {
    const item = await this.detail(id);

    await this.testRepo.remove(item);
  }
}
