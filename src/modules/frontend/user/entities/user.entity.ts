import { Entity, Column } from 'typeorm';
import { CommonEntity } from '@/common/entities/common.entities';

@Entity('user')
export class User extends CommonEntity {
  @Column({ comment: '用户名', type: 'varchar', length: 10 })
  nickname: string;

  @Column({ comment: '手机', type: 'varchar', length: 20 })
  phone: string;

  @Column({ comment: '邮箱', type: 'varchar', length: 50 })
  email: string;

  @Column({ comment: '年龄', type: 'int' })
  age: number;

  @Column({ comment: '状态: -1-冻结，1-正常，2-异常', type: 'int' })
  status: number;
}
