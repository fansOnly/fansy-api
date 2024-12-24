import { Entity, Column } from 'typeorm';
import { CommonEntity } from '@/common/entities/common.entities';

@Entity('admin')
export class Admin extends CommonEntity {
  @Column({ comment: '登录账号', type: 'varchar', length: 30 })
  username: string;

  @Column({ comment: '密码', type: 'varchar', length: 100, select: false })
  password: string;

  @Column({ comment: '用户名', type: 'varchar', length: 20 })
  nickname: string;

  @Column({ comment: '手机', type: 'varchar', length: 15 })
  phone: string;

  @Column({ comment: '邮箱', type: 'varchar', length: 50 })
  email: string;

  @Column({ comment: '角色id', type: 'varchar', length: 50 })
  roleId: string;

  @Column({ comment: '头像', type: 'varchar', length: 200 })
  avatar: string;

  @Column({ comment: '状态: -1-冻结，1-正常，2-异常', type: 'int', width: 2 })
  status: number;
}
