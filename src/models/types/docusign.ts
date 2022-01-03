export type envelope = {
  envelopeId: string,
  uri: string,
  statusDateTime: string,
  status: 'sent' | 'created'
}

export type DocusignConfig = {
  access_token: string,
  expires_in: Number,
  date_created: string,
}

export type EnvelopeData = {
  emailSubject: string;
  documents: Array<{
    documentBase64: string;
    name: string;
    fileExtension: string;
    documentId: string;
  }>;
  recipients: {
    carbonCopies: Array<{
      email: string,
      name: string,
      recipientId: string,
      routingOrder: string,
    }>,
    signers: Array<{
      email: string,
      name: string,
      recipientId: string | '1',
      routingOrder: string | '1',
      tabs: {
          signHereTabs: Array<{
            anchorString: '**signature_1**' | '/sn1/' | '**signature**' | '/sn/',
            anchorUnits: 'pixels',
            anchorXOffset: '20' | '30' | '40',
            anchorYOffset: '10' | '20' | '30',
          }>
      }
    }>
  },
  status: 'sent',
}
