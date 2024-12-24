import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export abstract class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'create_time', type: 'datetime', comment: '创建时间' })
  createTime: Date;

  @UpdateDateColumn({ name: 'update_time', type: 'datetime', comment: '更新时间' })
  updateTime?: Date;

  @DeleteDateColumn({ name: 'delete_time', type: 'datetime', comment: '删除时间' })
  deleteTime?: Date;
}
