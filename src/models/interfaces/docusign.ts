/* eslint-disable no-unused-vars */

export interface DocusignInterface {
  createEnvelope(envelopeData: any): Promise<any>;
  getAllEnvelopes(): Promise<Array<any>>;
}
