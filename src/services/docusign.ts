import { DocumentsInterface } from '../models/interfaces/documents';
import { DocusignInterface } from '../models/interfaces/docusign';
import { PatchDocumentStatus } from '../models/types/documentContract';
import { EnvelopeData } from '../models/types/docusign';

export class DocusignService implements DocusignInterface {
  private DocusignRepo: DocusignInterface;

  private DocumentRepo: DocumentsInterface;

  constructor(docusignRep: DocusignInterface, documentRepo: DocumentsInterface) {
    this.DocusignRepo = docusignRep;
    this.DocumentRepo = documentRepo;
  }

  getEnvelopeStatus(envelopeId: string, documentId: string): Promise<any> {
    return new Promise((resolve) => {
      this.DocusignRepo.getEnvelopeStatus(envelopeId, documentId).then((response) => {
        if (!response.success) {
          resolve(response);
        }
        if (response.data.status === 'completed') {
          const patchData: PatchDocumentStatus = {
            envelopeId: response.data.envelopeId,
            mode: 'sign',
            url: response.data.envelopeUri,
            dateCreated: response.data.createdDateTime,
            signDate: response.data.completedDateTime,
            envelopeStatus: response.data.status,
            documentId,
          };
          this.DocumentRepo.patchDocumentStatus(patchData);
          resolve(response.data);
        } else {
          resolve(response.data);
        }
      });
    });
  }

  async createEnvelope(envelopeData: EnvelopeData, documentId: string): Promise<any> {
    const { html } = await this.DocumentRepo.getDocument(documentId);
    // eslint-disable-next-line no-param-reassign
    envelopeData.documents[0].htmlDefinition.source = html;
    const envelopeResponse = await this.DocusignRepo.createEnvelope(envelopeData, documentId);

    if (envelopeResponse.success) {
      const data: PatchDocumentStatus = {
        documentId,
        envelopeId: envelopeResponse.data.envelopeId,
        dateCreated: envelopeResponse.data.statusDateTime,
        url: envelopeResponse.data.uri,
        envelopeStatus: envelopeResponse.data.status,
        mode: 'submit',
        signDate: '',
      };
      this.DocumentRepo.patchDocumentStatus(data);
      return ({ success: true, data: envelopeResponse.data });
    }
    return ({ success: false, message: envelopeResponse.data });
  }

  getAllEnvelopes(): Promise<Array<any>> {
    return new Promise((resolve) => {
      resolve(this.DocusignRepo.getAllEnvelopes());
    });
  }

  getSignedPdf(envelopeId: string): Promise<{ success: boolean, pdf: string; }> {
    return new Promise(
      (resolve) => {
        resolve(this.DocusignRepo.getSignedPdf(envelopeId));
      },
    );
  }
}
