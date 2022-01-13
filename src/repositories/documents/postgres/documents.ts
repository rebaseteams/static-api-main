/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import * as handlebars from 'handlebars';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express';
import * as fs from 'fs';
import { createConnection, In, Repository } from 'typeorm';
import { Template } from '../../../models/types/template';
import Document from '../../../models/entities/Document';
import { DocumentsInterface } from '../../../models/interfaces/documents';
import { DocumentContractData, DocumentMode, PatchDocumentStatus } from '../../../models/types/documentContract';
import fileCheck from '../../../utils/fileCheck';
import { FileManagerInterface } from '../../../models/interfaces/file-manager';

export default class DocumentsRepo implements DocumentsInterface {
  private documentRepository : Repository<Document>;

  private fileManagerRepository : FileManagerInterface;

  constructor(fileManagerRepo: FileManagerInterface) {
    createConnection().then((connection) => {
      this.documentRepository = connection.getRepository(Document);
    });
    this.fileManagerRepository = fileManagerRepo;
  }

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
    // const templateHtml = `./data/html/${html}`;
    const filekey = `contract-templates/${html}`;
    const downloadedRes = await this.fileManagerRepository.downloadFile(filekey);
    let compiledHtml;
    if (downloadedRes.success) {
      compiledHtml = handlebars.compile(downloadedRes.data.toString());
    }
    // else {
    //   compiledHtml = handlebars.compile(fs.readFileSync(templateHtml).toString());
    // }
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
    fileCheck(`${__dirname}/../in-memory/data`, false);
    fileCheck(`${__dirname}/../in-memory/data/html`, false);
    const htmlFile = `${__dirname}/../in-memory/data/html/${document.id}.html`;
    fs.writeFileSync(htmlFile, compiledHtml(requiredResources));
    this.documentRepository.save(document);
    document.html = compiledHtml(requiredResources);
    return { document };
  }

  async getAllDocuments() : Promise<Document[]> {
    let allDocuments : Document[] = [];
    [allDocuments] = await this.documentRepository.findAndCount();
    console.log(allDocuments);
    return allDocuments;
  }

  async getDocuments(ids : string[]) : Promise<Document[]> {
    let allDocuments : Document[] = [];
    allDocuments = await this.documentRepository.find({
      where: { id: In(ids) },
    });
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
      const newDocument = {
        ...document,
        html,
      };
      this.documentRepository.save(newDocument);
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

  async shareDocument(id : string, files : {[fieldname: string]: Express.Multer.File[]} |Express.Multer.File[], emails : string[], template : Template) {
    console.log(files);
    return { success: true };
  }

  async patchDocumentStatus({
    envelopeId,
    dateCreated,
    documentId,
    signDate,
    envelopeStatus,
    mode,
    url,
  }: PatchDocumentStatus) {
    const documentRes = await this.documentRepository.findOne({ id: documentId });
    let updatedData: Document;
    const contract: DocumentContractData = {
      envelopeId,
      dateCreated,
      url,
      signDate,
      status: envelopeStatus,
    };
    if (mode === 'sign') {
      updatedData = {
        ...documentRes,
        mode,
        contract,
      };
    }

    if (mode === 'submit') {
      updatedData = {
        ...documentRes,
        mode,
        contract,
      };
    }
    if (mode === 'edit') {
      updatedData = {
        ...documentRes,
        mode,
      };
    }
    const response = await this.documentRepository.save(updatedData);
    return response;
  }
}
