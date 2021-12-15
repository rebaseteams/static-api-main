/* eslint-disable no-console */
import { Express } from 'express';
import Document from '../models/entities/Document';
import { ArtistRecommendationInterface } from '../models/interfaces/artist-recommendation';
import { DocumentsInterface } from '../models/interfaces/documents';
import { Template } from '../models/types/template';

export default class DocumentsService implements DocumentsInterface {
  private documentsRepo: DocumentsInterface;

  private artistRecommendationRepo: ArtistRecommendationInterface;

  constructor(
    documentsRepo: DocumentsInterface,
    artistRecommendationRepo: ArtistRecommendationInterface,
  ) {
    this.documentsRepo = documentsRepo;
    this.artistRecommendationRepo = artistRecommendationRepo;
  }

  async createDocument(data : any, template : Template, recommendationId : string, docName : string, userid : string) : Promise<{ document : Document }> {
    const createDocData = await this.documentsRepo.createDocument(data, template, recommendationId, docName, userid);
    if (recommendationId) await this.artistRecommendationRepo.registerDocument(recommendationId, createDocData.document.id);
    return createDocData;
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
