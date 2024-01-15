import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'int4' })
  view: number;
}
