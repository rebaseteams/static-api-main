/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import * as handlebars from 'handlebars';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { DocumentsInterface } from '../../../models/interfaces/documents';
import { Template } from '../../../models/types/template';
import { Document } from '../../../models/types/document';
import fileCheck from '../../../utils/fileCheck';

export default class InMemoryDocumentsRepo implements DocumentsInterface {
  createDocument(data : any, template : Template, recommendationId : string) : { document : Document } {
    const templateFields = template.questions.map((value) => value.field);
    const dataFields = Object.keys(data);
    if (_.isEqual(templateFields.sort(), dataFields.sort())) {
      const { html } = template;
      const compiledHtml = handlebars.compile(html);
      const document = {
        documentId: uuidv4(),
        recommendationId,
        html: compiledHtml(data),
      };
      fileCheck(`${__dirname}/data`, false);
      fs.writeFileSync(`${__dirname}/data/${document.documentId}.json`, JSON.stringify(document));
      return { document };
    }
    const err = { message: 'All fields are required', statusCode: 400 };
    throw err;
  }

  getAllDocuments() : Document[] {
    fileCheck(`${__dirname}/data`, false);
    const allDocuments : Document[] = [];
    fs.readdirSync(`${__dirname}/data`).forEach((file) => {
      const toread = fs.readFileSync(`${__dirname}/data/${file}`).toString();
      const dataJson = JSON.parse(toread) as Document;
      allDocuments.push(dataJson);
    });
    return allDocuments;
  }

  getDocument(id : string) : Document {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const readData = fs.readFileSync(`${__dirname}/data/${id}.json`).toString();
      const data = JSON.parse(readData) as Document;
      return data;
    }
    const err = { message: `Document not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  deleteDocument(id : string) : { success : boolean } {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      fs.unlinkSync(`${__dirname}/data/${id}.json`);
      return { success: true };
    }
    const err = { message: `Document not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  editDocument(id : string, html : string) : { success : boolean } {
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
