import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Admin } from './entities/admin.entity'
import { wrapPromise, wrapQueryResponse, wrapListResponse, wrapActionResponse } from '@/utils/index'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly configService: ConfigService,
  ) {}
  async create(data: CreateAdminDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(data.password, salt);
    const [admin, err] = await wrapPromise(this.adminRepository.save({
      ...data,
      password: hash}));
    return wrapQueryResponse(admin, err);
  }

  async findAll(query: any, withDeleted: boolean = false) {
    const _pageSize = Number(this.configService.get('PAGE_SIZE'));
    const { username, page = 1, pageSize = _pageSize, status, sort = {} } = query;

    let where: any = {}
    if (username) {
      where.username = Like(`%${username}%`)
    }
    if (status) {
      where.status = status
    }

    const [adminList, err] = await wrapPromise(this.adminRepository.findAndCount({
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
    const [admin, err] = await wrapPromise(this.adminRepository.findOne({ where: { id } }));
    return wrapQueryResponse(admin, err);
  }

  async findOneByKey(key: string, value: string) {
    const [admin, err] = await wrapPromise(this.adminRepository.findOne({ where: { [key]: value } }));
    return wrapQueryResponse(admin, err);
  }

  async update(data: UpdateAdminDto) {
    const [res, err] = await wrapPromise(this.adminRepository.save(data));
    return wrapQueryResponse(res, err);
  }

  async remove(id: string | Array<string>) {
    const [res, err] = await wrapPromise(this.adminRepository.delete(id));
    return wrapActionResponse(res, err);
  }

  async softRemove(id: string | Array<string>) {
    const [res, err] = await wrapPromise(this.adminRepository.softDelete(id));
    return wrapActionResponse(res, err);
  }

  async restore(id: string | Array<string>) {
    const [res, err] = await wrapPromise(this.adminRepository.restore(id));
    return wrapActionResponse(res, err);
  }
}
