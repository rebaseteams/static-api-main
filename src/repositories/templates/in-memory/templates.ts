/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import * as fs from 'fs';
import { TemplatesInterface } from '../../../models/interfaces/templates';
import { Template } from '../../../models/types/template';

export default class InMemoryTemplatesRepo implements TemplatesInterface {
  createTemplate() {
    console.log('TODO : Create Template');
  }

  editTemplate() {
    console.log('TODO : Edit Template');
  }

  getTemplate(id : string) {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const readData = fs.readFileSync(`${__dirname}/data/${id}.json`).toString();
      return JSON.parse(readData) as Template;
    }
    const err = { message: `Template not found for id: ${id}`, statusCode: 404 };
    throw err;
  }
}

// /home/prasana/Documents/static-api-main/dist/repositories/templates/in-memory/data/1234.json
