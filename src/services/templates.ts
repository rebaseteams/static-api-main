// import * as moment from 'moment';
// import { v4 as uuidv4 } from 'uuid';

import { TemplatesInterface } from '../models/interfaces/templates';

export default class TemplatesService implements TemplatesInterface {
  private templatesRepo: TemplatesInterface;

  constructor(
    templatesRepo: TemplatesInterface,
  ) {
    this.templatesRepo = templatesRepo;
  }

  createTemplate() {
    this.templatesRepo.createTemplate();
  }

  editTemplate() {
    this.templatesRepo.editTemplate();
  }

  getTemplate(id : string) {
    return this.templatesRepo.getTemplate(id);
  }

  getAllTemplates() {
    return this.templatesRepo.getAllTemplates();
  }
}
