import { DocumentContractData, DocumentMode } from './documentContract';

export type Document = {

  id: string;
  templateId?: string;
  name: string;
  createdBy?: string;
  createdOn: Date;
  mode?: DocumentMode;
  html?: string;
  contract?: DocumentContractData;
};
