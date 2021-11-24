// import * as moment from 'moment';
// import { v4 as uuidv4 } from 'uuid';
import { DocumentsInterface } from '../models/interfaces/documents';
import { DocumentInput } from '../models/types/documents';

export default class DocumentsService implements DocumentsInterface {
  private documentsRepo: DocumentsInterface;

  constructor(
    documentsRepo: DocumentsInterface,
  ) {
    this.documentsRepo = documentsRepo;
  }

  sendHtmlTemplates(options: DocumentInput): string {
    return this.documentsRepo.sendHtmlTemplates(options);
  }
}
