import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('demo')
export class Demo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', comment: '序号' })
  sortnum: number;

  @Column({ type: 'varchar', length: 100, comment: '标题' })
  title: string;

  @Column({ type: 'int', comment: '状态: 1-正常，2-置顶' })
  status: number;

  @CreateDateColumn({ name: 'create_time', type: 'datetime', comment: '创建时间' })
  createTime: Date;

  @UpdateDateColumn({ name: 'update_time', type: 'datetime', comment: '更新时间' })
  updateTime?: Date;

  @DeleteDateColumn({ name: 'delete_time', type: 'datetime', comment: '删除时间' })
  deleteTime?: Date;
}
