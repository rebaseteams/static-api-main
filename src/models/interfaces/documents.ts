/* eslint-disable no-unused-vars */
import { Express } from 'express';
import Document from '../entities/Document';
import { Template } from '../types/template';

export interface DocumentsInterface{
  createDocument(data: any, required: any, template : Template, recommendationId : string, docName : string, userId : string) : Promise<{ document : Document }>;
  getDocument(id : string) : Promise<Document>;
  deleteDocument(id : string) : Promise<{ success : boolean }>;
  editDocument(id : string, html : string) : Promise<{ success : boolean }>;
  getAllDocuments() : Promise<Document[]>;
  getDocuments(ids : string[]) : Promise<Document[]>;
  shareDocument(id : string, files : {[fieldname: string]: Express.Multer.File[]} |Express.Multer.File[], emails : string[], template : Template) : Promise<{success : boolean}>;
}
