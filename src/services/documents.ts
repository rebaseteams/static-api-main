/* eslint-disable no-console */
import { Express } from 'express';
import Document from '../models/entities/Document';
import { DocumentsInterface } from '../models/interfaces/documents';
import { Template } from '../models/types/template';

export default class DocumentsService implements DocumentsInterface {
  private documentsRepo: DocumentsInterface;

  constructor(
    documentsRepo: DocumentsInterface,
  ) {
    this.documentsRepo = documentsRepo;
  }

  async createDocument(data : any, template : Template, recommendationId : string, docName : string, userid : string) : Promise<{ document : Document }> {
    return this.documentsRepo.createDocument(data, template, recommendationId, docName, userid);
  }

  async getAllDocuments(): Promise<Document[]> {
    return this.documentsRepo.getAllDocuments();
  }

  async getDocument(id : string): Promise<Document> {
    return this.documentsRepo.getDocument(id);
  }

  async deleteDocument(id : string): Promise<{ success : boolean }> {
    return this.documentsRepo.deleteDocument(id);
  }

  async editDocument(id : string, html : string): Promise<{ success : boolean }> {
    return this.documentsRepo.editDocument(id, html);
  }

  async shareDocument(id : string, files : {[fieldname: string]: Express.Multer.File[]} |Express.Multer.File[], emails : [string]) {
    return this.documentsRepo.shareDocument(id, files, emails);
  }
}
