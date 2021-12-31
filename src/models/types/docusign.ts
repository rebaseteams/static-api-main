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
