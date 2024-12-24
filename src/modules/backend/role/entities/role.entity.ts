import { Entity, Column } from 'typeorm';
import { CommonEntity } from '@/common/entities/common.entities';

@Entity('role')
export class Role extends CommonEntity {
  @Column({ comment: '角色名称', type: 'varchar', length: 50 })
  title: string;

  @Column({ comment: '角色描述', type: 'text', nullable: true })
  content: string;

  @Column({ comment: '权限列表', type: 'simple-array' })
  permissions: string[];

  @Column({ comment: '状态: -1-冻结，1-正常', type: 'int', width: 1 })
  status: number;
}
