/* eslint-disable class-methods-use-this */
import * as handlebars from 'handlebars';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { DocumentsInterface } from '../../../models/interfaces/documents';
import { Template } from '../../../models/types/template';
import fileCheck from '../../../utils/fileCheck';
import Document from '../../../models/entities/Document';

export default class InMemoryDocumentsRepo implements DocumentsInterface {
  // eslint-disable-next-line no-unused-vars
  async createDocument(data : any, template : Template, recommendationId : string, docName : string, userId : string) : Promise<{ document : Document }> {
    const templateFields = template.questions.map((value) => value.field);
    const dataFields = Object.keys(data);
    if (_.isEqual(templateFields.sort(), dataFields.sort())) {
      const { html } = template;
      const compiledHtml = handlebars.compile(html);
      const document : Document = {
        id: uuidv4(),
        name: docName,
        createdOn: new Date(),
        createdBy: userId,
        html: compiledHtml(data),
      };
      fileCheck(`${__dirname}/data`, false);
      fs.writeFileSync(`${__dirname}/data/${document.id}.json`, JSON.stringify(document));
      return { document };
    }
    const err = { message: 'All fields are required', statusCode: 400 };
    throw err;
  }

  async getAllDocuments() : Promise<Document[]> {
    fileCheck(`${__dirname}/data`, false);
    const allDocuments : Document[] = [];
    fs.readdirSync(`${__dirname}/data`).forEach((file) => {
      const toread = fs.readFileSync(`${__dirname}/data/${file}`).toString();
      const dataJson = JSON.parse(toread) as Document;
      allDocuments.push(dataJson);
    });
    return allDocuments;
  }

  async getDocument(id : string) : Promise<Document> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const readData = fs.readFileSync(`${__dirname}/data/${id}.json`).toString();
      const data = JSON.parse(readData) as Document;
      return data;
    }
    const err = { message: `Document not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async deleteDocument(id : string) : Promise<{ success : boolean }> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      fs.unlinkSync(`${__dirname}/data/${id}.json`);
      return { success: true };
    }
    const err = { message: `Document not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async editDocument(id : string, html : string) : Promise<{ success : boolean }> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const jsonString = fs.readFileSync(`${__dirname}/data/${id}.json`).toString();
      const jsonDocument = JSON.parse(jsonString) as Document;
      jsonDocument.html = html;
      fs.writeFileSync(`${__dirname}/data/${id}.json`, JSON.stringify(jsonDocument));
      return { success: true };
    }
    const err = { message: `Document not found for id: ${id}`, statusCode: 404 };
    throw err;
  }
}
