import * as handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { Express } from 'express';
import axios from 'axios';
import { AttachmentJSON } from '@sendgrid/helpers/classes/attachment';
import { DocumentsInterface } from '../../../models/interfaces/documents';
import { Template } from '../../../models/types/template';
import fileCheck from '../../../utils/fileCheck';
import Document from '../../../models/entities/Document';
import sendEmail from '../../../utils/email';

export default class InMemoryDocumentsRepo implements DocumentsInterface {
  // eslint-disable-next-line no-unused-vars
  async createDocument(data : any, required : any, template : Template, recommendationId : string, docName : string, userId : string) : Promise<{ document : Document }> {
    let requiredResources = {};
    if (template.resources) {
      // eslint-disable-next-line no-restricted-syntax
      for await (const resource of template.resources) {
        const compiledUrl = handlebars.compile(resource.url);
        requiredResources[resource.name] = (await axios.get(compiledUrl(required), { headers: { userid: '1238989' } })).data;
      }
    }
    requiredResources = {
      ...requiredResources,
      ...data,
    };
    const { html } = template;
    const compiledHtml = handlebars.compile(fs.readFileSync(`src/repositories/templates/in-memory/data/html/${html}`).toString().replace(/\n/g, '').replace(/(^"|"$)/g, ''));
    const document : Document = {
      id: uuidv4(),
      template_id: template.templateId,
      name: docName,
      createdOn: new Date(),
      createdBy: userId,
      html,
    };
    fileCheck(`${__dirname}/data`, false);
    fileCheck(`${__dirname}/data/html`, false);
    fs.writeFileSync(`${__dirname}/data/html/${document.id}.html`, JSON.stringify(compiledHtml(requiredResources)));
    fs.writeFileSync(`${__dirname}/data/${document.id}.json`, JSON.stringify(document));
    return { document };
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

  async getDocuments(ids : string[]) : Promise<Document[]> {
    fileCheck(`${__dirname}/data`, false);
    const allDocuments : Document[] = [];
    fs.readdirSync(`${__dirname}/data`).forEach((file) => {
      const toread = fs.readFileSync(`${__dirname}/data/${file}`).toString();
      const dataJson = JSON.parse(toread) as Document;
      if (ids.includes(dataJson.id)) allDocuments.push(dataJson);
    });
    return allDocuments;
  }

  async getDocument(id : string) : Promise<Document> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const readData = fs.readFileSync(`${__dirname}/data/${id}.json`).toString();
      const data = JSON.parse(readData) as Document;
      data.html = fs.readFileSync(`${__dirname}/data/html/${id}.html`).toString().replace(/\n/g, '').replace(/(^"|"$)/g, '');
      return data;
    }
    const err = { message: `Document not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async deleteDocument(id : string) : Promise<{ success : boolean }> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`) && fs.existsSync(`${__dirname}/data/html/${id}.html`)) {
      fs.unlinkSync(`${__dirname}/data/${id}.json`);
      fs.unlinkSync(`${__dirname}/data/html/${id}.html`);
      return { success: true };
    }
    const err = { message: `Document not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async editDocument(id : string, html : string) : Promise<{ success : boolean }> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`) && fs.existsSync(`${__dirname}/data/html/${id}.html`)) {
      fs.writeFileSync(`${__dirname}/data/html/${id}.html`, JSON.stringify(html));
      return { success: true };
    }
    const err = { message: `Document not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async shareDocument(id : string, files : {[fieldname: string]: Express.Multer.File[]} |Express.Multer.File[], emails : string[], template : Template) : Promise<{success : boolean}> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const attachments :AttachmentJSON[] = [];
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        attachments.push({
          content: file.buffer.toString('base64'),
          filename: file.originalname,
          type: file.mimetype,
          disposition: 'attachment',
        });
      }
      await sendEmail({
        to: emails[0],
        subject: 'Document shared',
        html: template.email,
        attachments,
      });
      return { success: true };
    }
    const err = { message: `Document not found for id: ${id}`, statusCode: 404 };
    throw err;
  }
}
