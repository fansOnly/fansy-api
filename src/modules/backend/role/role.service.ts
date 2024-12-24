import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Role } from './entities/role.entity'
import { wrapPromise, wrapQueryResponse, wrapListResponse, wrapActionResponse } from '@/utils/index'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly configService: ConfigService,
  ){}
  async create(data: CreateRoleDto) {
    const [admin, err] = await wrapPromise(this.roleRepository.save(data));
    return wrapQueryResponse(admin, err);
  }

  async findAll(query: any, withDeleted: boolean = false) {
    const _pageSize = Number(this.configService.get('PAGE_SIZE'));
    const { page = 1, pageSize = _pageSize, status, sort = {} } = query;

    let where: any = {}
    if (status) {
      where.status = status
    }

    const [adminList, err] = await wrapPromise(this.roleRepository.findAndCount({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      withDeleted,
      order: {
        ...sort,
        createTime: 'DESC',
      }
    }))
    return wrapListResponse(adminList, err);
  }

  async findOne(id: string) {
    const [admin, err] = await wrapPromise(this.roleRepository.findOne({ where: { id } }));
    return wrapQueryResponse(admin, err);
  }

  async findOneByKey(key: string, value: string) {
    const [admin, err] = await wrapPromise(this.roleRepository.findOne({ where: { [key]: value } }));
    return wrapQueryResponse(admin, err);
  }

  async update(data: UpdateRoleDto) {
    const [res, err] = await wrapPromise(this.roleRepository.save(data));
    return wrapQueryResponse(res, err);
  }

  async remove(id: string | Array<string>) {
    const [res, err] = await wrapPromise(this.roleRepository.delete(id));
    return wrapActionResponse(res, err);
  }

  async softRemove(id: string | Array<string>) {
    const [res, err] = await wrapPromise(this.roleRepository.softDelete(id));
    return wrapActionResponse(res, err);
  }

  async restore(id: string | Array<string>) {
    const [res, err] = await wrapPromise(this.roleRepository.restore(id));
    return wrapActionResponse(res, err);
  }
}
