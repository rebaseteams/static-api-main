import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class Genre {
  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
