import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'dev-post',
})
export default class DevPost {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'int4' })
  view: number;
}
