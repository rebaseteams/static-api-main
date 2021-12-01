/* eslint-disable no-unused-vars */
import { Document } from '../types/document';
import { Template } from '../types/template';

/* The repositories are supposed to implement this interface */
export interface DocumentsInterface{
  createDocument(data: any, template : Template, recommendationId : string, docName : string) : { document : Document };
  getDocument(id : string) : Document;
  deleteDocument(id : string) : { success : boolean };
  editDocument(id : string, html : string) : { success : boolean };
  getAllDocuments() : Document[];
}
