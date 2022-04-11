// import * as moment from 'moment';
// import { v4 as uuidv4 } from 'uuid';

import { TemplatesInterface } from '../models/interfaces/templates';
import { Template } from '../models/types/template';

export default class TemplatesService implements TemplatesInterface {
  private templatesRepo: TemplatesInterface;

  constructor(
    templatesRepo: TemplatesInterface,
  ) {
    this.templatesRepo = templatesRepo;
  }

  createTemplate(id: string, templateObject: Template, template: string) : Promise<{success: boolean}> {
    return this.templatesRepo.createTemplate(id, templateObject, template);
  }

  editTemplate() {
    this.templatesRepo.editTemplate();
  }

  getTemplate(id : string): Promise<Template> {
    return this.templatesRepo.getTemplate(id);
  }

  getAllTemplates(): Promise<Template[]> {
    return this.templatesRepo.getAllTemplates();
  }
}
