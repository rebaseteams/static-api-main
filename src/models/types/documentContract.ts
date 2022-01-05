export type DocumentContractData = {
  envelopeId: string;
  url: string;
  dateCreated: string;
  signDate: string;
  status: string;
}

export type DocumentMode = 'edit' | 'submit' | 'sign';

export type PatchDocumentStatus = {
  documentId: string;
  mode: DocumentMode;
  envelopeId: string;
  dateCreated: string;
  url: string;
  signDate: string;
  envelopeStatus: string;
}
