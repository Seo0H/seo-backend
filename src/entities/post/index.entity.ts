import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export default class Post {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'int4', nullable: true, default: 0 })
  views: number;
}
