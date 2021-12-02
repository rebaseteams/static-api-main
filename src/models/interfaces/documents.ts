/* eslint-disable no-unused-vars */
import Document from '../entities/Document';
import { Template } from '../types/template';
/* The repositories are supposed to implement this interface */
export interface DocumentsInterface{
  createDocument(data: any, template : Template, recommendationId : string, docName : string, userId : string) : Promise<{ document : Document }>;
  getDocument(id : string) : Promise<Document>;
  deleteDocument(id : string) : Promise<{ success : boolean }>;
  editDocument(id : string, html : string) : Promise<{ success : boolean }>;
  getAllDocuments() : Promise<Document[]>;
}
