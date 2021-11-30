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

  getAllDocuments(): void {
    this.documentsRepo.getAllDocuments();
  }

  getDocument(): void {
    this.documentsRepo.getDocument();
  }

  deleteDocument(): void {
    this.documentsRepo.deleteDocument();
  }

  editDocument(): void {
    this.documentsRepo.editDocument();
  }
}
