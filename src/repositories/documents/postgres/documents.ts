/* eslint-disable class-methods-use-this */
import * as handlebars from 'handlebars';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { createConnection, Repository } from 'typeorm';
import { Template } from '../../../models/types/template';
import Document from '../../../models/entities/Document';
import { DocumentsInterface } from '../../../models/interfaces/documents';

export default class DocumentsRepo implements DocumentsInterface {
  private documentRepository : Repository<Document>;

  constructor() {
    createConnection().then((connection) => {
      this.documentRepository = connection.getRepository(Document);
    });
  }

  async createDocument(data : any, template : Template, recommendationId : string, docName : string, userId : string) : Promise<{ document : Document }> {
    const templateFields = template.questions.map((value) => value.field);
    const dataFields = Object.keys(data);
    if (_.isEqual(templateFields.sort(), dataFields.sort())) {
      const { html } = template;
      const compiledHtml = handlebars.compile(html);
      const document = new Document(uuidv4(), docName, userId, new Date(), compiledHtml(data));
      await this.documentRepository.save(document);
      return { document };
    }
    const err = { message: 'All fields are required', statusCode: 400 };
    throw err;
  }

  async getAllDocuments() : Promise<Document[]> {
    let allDocuments : Document[] = [];
    allDocuments = await this.documentRepository.find();
    return allDocuments;
  }

  async getDocument(id : string) : Promise<Document> {
    const document = await this.documentRepository.findOne({ id });
    if (document) return document;
    const err = { message: `Document not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async editDocument(id : string, html : string) : Promise<{ success : boolean }> {
    const document = await this.documentRepository.findOne({ id });
    if (document) {
      document.html = html;
      this.documentRepository.save(document);
      return { success: true };
    }
    const err = { message: `Document not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async deleteDocument(id : string) : Promise<{ success : boolean }> {
    const resp = await this.documentRepository.delete({ id });
    if (resp.affected && resp.affected > 0) return { success: true };
    const err = { message: `Document not found for id: ${id}`, statusCode: 404 };
    throw err;
  }
}
