/* eslint-disable no-unused-vars */

import { EnvelopeData } from '../types/docusign';

export interface DocusignInterface {
  createEnvelope(envelopeData: EnvelopeData): Promise<any>;
  getAllEnvelopes(): Promise<Array<any>>;
}
