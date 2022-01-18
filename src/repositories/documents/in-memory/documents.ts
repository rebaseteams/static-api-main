import * as handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express';
// import axios from 'axios';
import { AttachmentJSON } from '@sendgrid/helpers/classes/attachment';
import { DocumentsInterface } from '../../../models/interfaces/documents';
import { Template } from '../../../models/types/template';
import fileCheck from '../../../utils/fileCheck';
import Document from '../../../models/entities/Document';
import sendEmail from '../../../utils/email';
import { DocumentContractData, DocumentMode, PatchDocumentStatus } from '../../../models/types/documentContract';
import { FileManagerInterface } from '../../../models/interfaces/file-manager';

export default class InMemoryDocumentsRepo implements DocumentsInterface {
  fileManager: FileManagerInterface;

  constructor(fileManager: FileManagerInterface) {
    this.fileManager = fileManager;
  }

  // eslint-disable-next-line no-unused-vars
  async createDocument(data : any, required : any, template : Template, recommendationId : string, docName : string, userId : string) : Promise<{ document : Document }> {
    let requiredResources = {};
    // Tempararyly disabling error prone code
    // if (template.resources) {
    //   // eslint-disable-next-line no-restricted-syntax
    //   for await (const resource of template.resources) {
    //     const compiledUrl = handlebars.compile(resource.url);
    //     requiredResources[resource.name] = (await axios.get(compiledUrl(required), { headers: { userid: process.env.DEFAULT_USERID } })).data;
    //   }
    // }
    requiredResources = {
      ...requiredResources,
      ...data,
    };
    const { html } = template;
    const readData = await this.fileManager.get(`documents/html/${html}`);
    const compiledHtml = handlebars.compile(readData.data.toString());
    const defaultMode: DocumentMode = 'edit';
    const defaultContract: DocumentContractData = {
      envelopeId: '',
      url: '',
      dateCreated: '',
      signDate: '',
      status: '',
    };
    const document : Document = {
      id: uuidv4(),
      template_id: template.templateId,
      name: docName,
      mode: defaultMode,
      contract: defaultContract,
      created_on: new Date(),
      created_by: userId,
      html,
    };

    await this.fileManager.set(
      `documents/html/${document.id}.html`, Buffer.from(compiledHtml(requiredResources)),
    );

    await this.fileManager.set(
      `documents/${document.id}.json`, Buffer.from(JSON.stringify(document)),
    );

    return { document };
  }

  async getAllDocuments() : Promise<Document[]> {
    // fileCheck(`${__dirname}/data`, false);

    const allDocuments : Document[] = [];
    const files = await this.fileManager.list('documents');
    for (let ind = 0; ind < files.data.length; ind++) {
      const file = files[ind];
      if (file !== 'html') {
        const toread = await this.fileManager.get(`documents/${file}`);
        const doc = JSON.parse(toread.data.toString()) as Document;
        allDocuments.push(doc);
      }
    }

    return allDocuments;
  }

  async getDocuments(ids : string[]) : Promise<Document[]> {
    fileCheck(`${__dirname}/data`, false);
    const allDocuments : Document[] = [];
    const files = await this.fileManager.list('documents');
    for (let ind = 0; ind < files.data.length; ind++) {
      const file = files[ind];
      if (file !== 'html') {
        const toread = await this.fileManager.get(`documents/${file}`);
        const doc = JSON.parse(toread.data.toString()) as Document;
        if (ids.includes(doc.id)) allDocuments.push(doc);
      }
    }
    return allDocuments;
  }

  async getDocument(id : string) : Promise<Document> {
    const exists = await this.fileManager.get(`documents/${id}.json`);

    if (exists) {
      const readData = await this.fileManager.get(`documents/${id}.json`);

      const data = JSON.parse(readData.data.toString()) as Document;

      const htmlData = await this.fileManager.get(`documents/html/${id}.html`);

      data.html = htmlData.data.toString();
      return data;
    }
    const err = { message: `Document not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async deleteDocument(id : string) : Promise<{ success : boolean }> {
    const exists = await this.fileManager.exists(`documents/${id}.json`);
    const htmlExists = await this.fileManager.exists(`documents/html/${id}.html`);

    if (exists && htmlExists) {
      await this.fileManager.delete(`documents/${id}.json`);
      await this.fileManager.delete(`documents/html/${id}.html`);
      return { success: true };
    }
    const err = { message: `Document not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async editDocument(id : string, html : string) : Promise<{ success : boolean }> {
    const exists = await this.fileManager.exists(`documents/${id}.json`);
    const htmlExists = await this.fileManager.exists(`documents/html/${id}.html`);

    if (exists && htmlExists) {
      await this.fileManager.set(`documents/html/${id}.html`, Buffer.from(html));
      return { success: true };
    }
    const err = { message: `Document not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async shareDocument(id : string, files : {[fieldname: string]: Express.Multer.File[]} |Express.Multer.File[], emails : string[], template : Template) : Promise<{success : boolean}> {
    const exists = await this.fileManager.exists(`documents/${id}.json`);
    if (exists) {
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

  async patchDocumentStatus(data: PatchDocumentStatus): Promise<any> {
    return new Promise((resolve) => {
      resolve({ message: 'TODO', data });
    });
  }
}
