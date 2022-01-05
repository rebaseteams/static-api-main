/* eslint-disable no-unused-vars */

import { EnvelopeData } from '../types/docusign';

export type CreateEnvelopeResponseData = {
  envelopeId: string,
  uri: string,
  statusDateTime: string,
  status: string,
}

export interface DocusignInterface {
  createEnvelope(envelopeData: EnvelopeData, documentId: string): Promise<{ success: boolean; data?: CreateEnvelopeResponseData }>;
  getEnvelopeStatus(envelopeId: string, documentId: string): Promise<any>;
  getAllEnvelopes(): Promise<Array<any>>;
}
