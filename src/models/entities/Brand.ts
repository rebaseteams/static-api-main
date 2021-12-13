import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class Brand {
  constructor(id: string, name: string, logo: string, website: string, contact: string) {
    this.id = id;
    this.name = name;
    this.logo = logo;
    this.website = website;
    this.contact = contact;
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column()
  website: string;

  @Column()
  contact: string;
}
