import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../admin/entities/admin.entity';
import { wrapQueryResponse } from '@/utils/index';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const admin = await this.adminRepository.findOne({ where: { username }, select: ['id', 'username', 'password', 'phone'] });
    // const admin2 = await this.adminRepository.createQueryBuilder().addSelect('password','Admin_password').where('username = :username', { username: 'rnfgo' }).getOne();
    // console.log('admin2: ', admin2);

    if (!admin) {
      return {
        code: 10011,
        msg: '用户不存在',
      };
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return {
        code: 10012,
        msg: '密码错误',
      };
    }
    return wrapQueryResponse({
      access_token: await this.generateAccessToken(admin),
      refresh_token: await this.generateRefreshToken(admin),
    });
  }

  async refreshToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret2,
      });
  
      return wrapQueryResponse({
        access_token: await this.generateAccessToken(decoded),
        refresh_token: await this.generateRefreshToken(decoded),
      });
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async generateAccessToken(admin: any): Promise<string> {
    const payload = { username: admin.username, sub: admin.userId };
    return this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '30s',
    });
  }

  async generateRefreshToken(admin: any): Promise<string> {
    const payload = { username: admin.username, sub: admin.userId };
    return this.jwtService.sign(payload, {
      secret: jwtConstants.secret2,
      expiresIn: '1m',
    });
  }
}
