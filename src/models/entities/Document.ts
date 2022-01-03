import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class Document {
  constructor(id: string, template_id: string, name: string, createdBy: string, createdOn: Date, html: string) {
    this.id = id;
    this.template_id = template_id;
    this.name = name;
    this.created_by = createdBy;
    this.created_on = createdOn;
    this.html = html;
  }

  @PrimaryColumn()
  id: string;

  @Column({ default: '1234' })
  template_id: string;

  @Column()
  name: string;

  @Column()
  created_by: string;

  @Column({ type: 'timestamp' })
  created_on: Date;

  @Column({ type: 'text' })
  html: string;
}
