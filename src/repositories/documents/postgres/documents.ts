/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { Express } from 'express';
import * as handlebars from 'handlebars';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { Connection, In, Repository } from 'typeorm';
import { Template } from '../../../models/types/template';
import { Document } from '../../../models/types/document';
import { DocumentsInterface } from '../../../models/interfaces/documents';
import { DocumentContractData, DocumentMode, PatchDocumentStatus } from '../../../models/types/documentContract';
import fileCheck from '../../../utils/fileCheck';
import { FileManagerInterface } from '../../../models/interfaces/file-manager';
import PgDocumentEntity from '../../../models/entities/pg-document';
import { mapDocument } from '../../../utils/pg-to-type-mapper';

export default class DocumentsRepo implements DocumentsInterface {
  private documentRepository : Repository<PgDocumentEntity>;

  private fileManagerRepository : FileManagerInterface;

  constructor(connection: Connection, fileManagerRepo: FileManagerInterface) {
    this.documentRepository = connection.getRepository(PgDocumentEntity);
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
    const downloadedRes = await this.fileManagerRepository.get(filekey);
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
    const document : PgDocumentEntity = {
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

    return { document: mapDocument(document) };
  }

  async getAllDocuments() : Promise<Document[]> {
    let allDocuments : PgDocumentEntity[] = [];
    [allDocuments] = await this.documentRepository.findAndCount();
    return allDocuments.map((d) => mapDocument(d));
  }

  async getDocuments(ids : string[]) : Promise<Document[]> {
    let allDocuments : PgDocumentEntity[] = [];
    allDocuments = await this.documentRepository.find({
      where: { id: In(ids) },
    });
    return allDocuments.map((d) => mapDocument(d));
  }

  async getDocument(id : string) : Promise<Document> {
    const document = await this.documentRepository.findOne({ id });
    if (document) return mapDocument(document);
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
        ...mapDocument(documentRes),
        mode,
        contract,
      };
    }

    if (mode === 'submit') {
      updatedData = {
        ...mapDocument(documentRes),
        mode,
        contract,
      };
    }
    if (mode === 'edit') {
      updatedData = {
        ...mapDocument(documentRes),
        mode,
      };
    }
    const response = await this.documentRepository.save(updatedData);
    return response;
  }
}
