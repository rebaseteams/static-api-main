/* eslint-disable no-console */
import { Express } from 'express';
import Document from '../models/entities/Document';
import { ArtistRecommendationInterface } from '../models/interfaces/artist-recommendation';
import { DocumentsInterface } from '../models/interfaces/documents';
import { TemplatesInterface } from '../models/interfaces/templates';
import { PatchDocumentStatus } from '../models/types/documentContract';
import { Template } from '../models/types/template';

export default class DocumentsService implements DocumentsInterface {
  private documentsRepo: DocumentsInterface;

  private artistRecommendationRepo: ArtistRecommendationInterface;

  private templateRepo: TemplatesInterface;

  constructor(
    documentsRepo: DocumentsInterface,
    artistRecommendationRepo: ArtistRecommendationInterface,
    templateRepo: TemplatesInterface,
  ) {
    this.documentsRepo = documentsRepo;
    this.artistRecommendationRepo = artistRecommendationRepo;
    this.templateRepo = templateRepo;
  }

  async patchDocumentStatus(data: PatchDocumentStatus) {
    const patchData = await this.documentsRepo.patchDocumentStatus(data);
    return patchData;
  }

  async createDocument(data : any, required : any, template : Template, recommendationId : string, docName : string, userid : string) : Promise<{ document : Document }> {
    const createDocData = await this.documentsRepo.createDocument(data, required, template, recommendationId, docName, userid);
    if (recommendationId) await this.artistRecommendationRepo.registerDocument(recommendationId, createDocData.document.id);
    return createDocData;
  }

  async getAllDocuments(): Promise<Document[]> {
    return this.documentsRepo.getAllDocuments();
  }

  async getDocuments(ids : string[]): Promise<Document[]> {
    return this.documentsRepo.getDocuments(ids);
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
    const doc = await this.getDocument(id);
    const template = this.templateRepo.getTemplate(doc.template_id);
    return this.documentsRepo.shareDocument(id, files, emails, template);
  }
}
