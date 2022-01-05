import { Entity, Column, PrimaryColumn } from 'typeorm';
import { DocumentContractData, DocumentMode } from '../types/documentContract';

@Entity()
export default class Document {
  constructor(id: string,
    template_id: string,
    name: string,
    createdBy: string,
    createdOn: Date,
    mode: DocumentMode,
    html: string,
    contract: DocumentContractData) {
    this.id = id;
    this.template_id = template_id;
    this.name = name;
    this.created_by = createdBy;
    this.created_on = createdOn;
    this.mode = mode;
    this.html = html;
    this.contract = contract;
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

  @Column({ default: 'edit', nullable: true })
  mode: DocumentMode;

  @Column({ type: 'text' })
  html: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    default: {
      envelopeId: '',
      url: '',
      dateCreated: '',
      signDate: '',
      status: '',
    },
  })
  contract: DocumentContractData;
}
