import { Entity, Column, PrimaryColumn } from 'typeorm';
import { DocumentContractData, DocumentMode } from '../types/documentContract';

@Entity({ name: 'document' })
export default class PgDocumentEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
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
