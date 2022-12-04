import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from '@/entities/apps/test.entity';
import { TestCreateDto, TestUpdateDto, TestPageDto } from './test.dto';
import { ApiException } from '@/common/exceptions/api.exception';
import { PageRespData } from '@/common/response.modal';
import { ErrorEnum } from '@/common/constants/error';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testRepo: Repository<Test>,
  ) {}

  async list(): Promise<Test[]> {
    return await this.testRepo.find();
  }

  async page(dto: TestPageDto): Promise<PageRespData<Test>> {
    const { page, pageSize } = dto;

    const [items, total] = await this.testRepo
      .createQueryBuilder(this.testRepo.metadata.tableName)
      .skip(pageSize * (page - 1))
      .take(pageSize)
      .getManyAndCount();

    return { total, items };
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
