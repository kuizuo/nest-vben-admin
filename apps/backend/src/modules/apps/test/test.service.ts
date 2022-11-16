import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Test from '@/entities/apps/test.entity';
import { TestCreateDto, TestUpdateDto, TestPageDto } from './test.dto';
import { ApiException } from '@/common/exceptions/api.exception';
import { PageResult } from '@/common/class/res.class';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
  ) {}

  async list(): Promise<Test[]> {
    return await this.testRepository.find();
  }

  async page(dto: TestPageDto): Promise<PageResult<Test>> {
    const { page, pageSize } = dto;

    const [items, total] = await this.testRepository
      .createQueryBuilder(this.testRepository.metadata.tableName)
      .skip(pageSize * (page - 1))
      .take(pageSize)
      .getManyAndCount();

    return { total, items };
  }

  async detail(id: number): Promise<Test> {
    const item = await this.testRepository.findOneBy({ id });
    if (!item) throw new ApiException(20004);

    return item;
  }

  async create(dto: TestCreateDto) {
    let test = new Test();
    test = Object.assign(dto);

    await this.testRepository.save(test);
  }

  async update(dto: TestUpdateDto) {
    const item = await this.detail(dto.id);

    const test: Test = Object.assign(item, dto);
    await this.testRepository.save(test);
  }

  async delete(id: number) {
    const item = await this.detail(id);

    await this.testRepository.remove(item);
  }
}
