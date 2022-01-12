import { DocumentsInterface } from '../models/interfaces/documents';
import { DocusignInterface } from '../models/interfaces/docusign';
import { PatchDocumentStatus } from '../models/types/documentContract';

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

  createEnvelope(envelopeData: any, documentId: string): Promise<any> {
    return new Promise((resolve) => {
      try {
        this.DocusignRepo.createEnvelope(envelopeData, documentId).then((envelopeResponse) => {
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
            resolve({ success: true, data: envelopeResponse.data });
          }
          resolve({ success: false, message: envelopeResponse });
        });
      } catch (err) {
        resolve({ success: false, message: err });
      }
    });
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
