import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class User {
  constructor(id: string, name: string, email: string, roles: string[] = [], approved: boolean = null) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.approved = approved;
    this.roles = roles;
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string

  @Column('text', { array: true })
  roles: string[]

  @Column({ nullable: true })
  approved: boolean;
}
