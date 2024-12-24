import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { wrapPromise, wrapQueryResponse, wrapListResponse, wrapActionResponse } from '@/utils/index'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(data: CreateUserDto) {
    const [user, err] = await wrapPromise(this.userRepository.save(data));
    return wrapQueryResponse(user, err);
  }

  async findAll(query: any, withDeleted: boolean = false) {
    const { nickname, page, pageSize, status, sort = {} } = query;

    let where: any = {}
    if (nickname) {
      where.nickname = Like(`%${nickname}%`)
    }
    if (status) {
      where.status = status
    }

    const [userList, err] = await wrapPromise(this.userRepository.findAndCount({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      withDeleted,
      order: {
        ...sort,
        createTime: 'DESC',
      }
    }))
    return wrapListResponse(userList, err);
  }

  async findOne(id: string) {
    const [user, err] = await wrapPromise(this.userRepository.findOne({ where: { id } }));
    return wrapQueryResponse(user, err);
  }

  async update(data: UpdateUserDto) {
    const [res, err] = await wrapPromise(this.userRepository.save(data));
    return wrapQueryResponse(res, err);
  }

  async remove(id: string | Array<string>) {
    const [res, err] = await wrapPromise(this.userRepository.delete(id));
    return wrapActionResponse(res, err);
  }

  async softRemove(id: string | Array<string>) {
    const [res, err] = await wrapPromise(this.userRepository.softDelete(id));
    return wrapActionResponse(res, err);
  }

  async restore(id: string | Array<string>) {
    const [res, err] = await wrapPromise(this.userRepository.restore(id));
    return wrapActionResponse(res, err);
  }
}
