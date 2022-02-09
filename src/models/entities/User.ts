import {
  Entity, Column, PrimaryColumn, ManyToMany, JoinTable,
} from 'typeorm';
import Role from './Role';

@Entity()
export default class User {
  constructor(id: string, name: string, email: string, roles: Role[] = [], approved: boolean = null) {
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

  @Column({ nullable: true })
  approved: boolean;

  @ManyToMany(() => Role) @JoinTable()
  roles: Role[];
}
