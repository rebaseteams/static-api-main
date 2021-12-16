import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class Document {
  constructor(id: string, template_id: string, name: string, createdBy: string, createdOn: Date, html: string) {
    this.id = id;
    this.template_id = template_id;
    this.name = name;
    this.createdBy = createdBy;
    this.createdOn = createdOn;
    this.html = html;
  }

  @PrimaryColumn()
  id: string;

  @Column({ default: '1234' })
  template_id: string;

  @Column()
  name: string;

  @Column()
  createdBy: string;

  @Column({ type: 'timestamp' })
  createdOn: Date;

  @Column({ type: 'text' })
  html: string;
}
