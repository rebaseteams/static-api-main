import { DocumentsInterface } from '../models/interfaces/documents';
import { Document } from '../models/types/document';
import { Template } from '../models/types/template';

export default class DocumentsService implements DocumentsInterface {
  private documentsRepo: DocumentsInterface;

  constructor(
    documentsRepo: DocumentsInterface,
  ) {
    this.documentsRepo = documentsRepo;
  }

  createDocument(data : any, template : Template, recommendationId : string) : { document : Document } {
    return this.documentsRepo.createDocument(data, template, recommendationId);
  }

  getAllDocuments(): Document[] {
    return this.documentsRepo.getAllDocuments();
  }

  getDocument(id : string): Document {
    return this.documentsRepo.getDocument(id);
  }

  deleteDocument(id : string): { success : boolean } {
    return this.documentsRepo.deleteDocument(id);
  }

  editDocument(): void {
    this.documentsRepo.editDocument();
  }
}
