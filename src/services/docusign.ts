import { DocusignInterface } from '../models/interfaces/docusign';

export class DocusignService implements DocusignInterface {
  private DocusignRepo: DocusignInterface;

  constructor(docusignRep: DocusignInterface) {
    this.DocusignRepo = docusignRep;
  }

  createEnvelope(envelopeData: any): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.DocusignRepo.createEnvelope(envelopeData));
    });
  }
}
