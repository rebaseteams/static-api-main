/* eslint-disable no-unused-vars */
import { Template } from '../types/template';

/* The repositories are supposed to implement this interface */
export interface TemplatesInterface{
  createTemplate() : void;
  editTemplate() : void;
  getTemplate(id : string) : Promise<Template>;
  getAllTemplates() : Promise<Template[]>;
}
