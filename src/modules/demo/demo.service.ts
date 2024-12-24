import { Injectable } from '@nestjs/common';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Demo } from './entities/demo.entity';
import { wrapPromise, wrapQueryResponse, wrapListResponse, wrapActionResponse } from '@/utils/index'

@Injectable()
export class DemoService {
  constructor(
    @InjectRepository(Demo)
    private readonly demoRepository: Repository<Demo>,
  ) {}
  async create(data: CreateDemoDto) {
    const [demo, err] = await wrapPromise(this.demoRepository.save(data));
    return wrapQueryResponse(demo, err);
  }

  async findAll(query: any, withDeleted: boolean = false) {
    const { title, page, pageSize, status, sort = {} } = query;

    let where: any = {}
    if (title) {
      where.title = Like(`%${title}%`)
    }
    if (status) {
      where.status = status
    }

    const [demoList, err] = await wrapPromise(this.demoRepository.findAndCount({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      withDeleted,
      order: {
        status: 'DESC', // 置顶
        ...sort,
        sortnum: 'DESC',
        createTime: 'DESC',
      }
    }))
    return wrapListResponse(demoList, err);
  }

  async findOne(id: string) {
    const [demo, err] = await wrapPromise(this.demoRepository.findOne({ where: { id } }));
    return wrapQueryResponse(demo, err);
  }

  async update(id: string, data: UpdateDemoDto) {
    const [res, err] = await wrapPromise(this.demoRepository.update(id, data));
    return wrapActionResponse(res, err);
  }

  async remove(id: string | Array<string>) {
    const [res, err] = await wrapPromise(this.demoRepository.delete(id));
    return wrapActionResponse(res, err);
  }

  async softRemove(id: string | Array<string>) {
    const [res, err] = await wrapPromise(this.demoRepository.softDelete(id));
    return wrapActionResponse(res, err);
  }

  async restore(id: string | Array<string>) {
    const [res, err] = await wrapPromise(this.demoRepository.restore(id));
    return wrapActionResponse(res, err);
  }
}
