/* eslint-disable no-unused-vars */
import { DocumentInput } from '../types/documents';
import { Template } from '../types/template';

/* The repositories are supposed to implement this interface */
export interface TemplatesInterface{
  createTemplate() : void;
  editTemplate() : void;
  getTemplate(id : string) : Template
  getAllTemplates() : Template[]
}
