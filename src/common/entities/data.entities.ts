import { Column } from "typeorm";

export abstract class DataEntity {

  @Column({ type: 'int', comment: '序号' })
  sortnum: number;
  
  @Column({ type: 'varchar', comment: '标题', length: 100 })
  title: string;

  @Column({ comment: '内容', type: 'text' })
  content: string;

  @Column({ comment: '操作人', type: 'varchar', length: 20 })
  operator: string;
}