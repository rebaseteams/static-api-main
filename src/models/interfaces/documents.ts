/* eslint-disable no-unused-vars */
import { DocumentInput } from '../types/documents';

/* The repositories are supposed to implement this interface */
export interface DocumentsInterface{
  sendHTMLtemplates(options: DocumentInput): string;
}
