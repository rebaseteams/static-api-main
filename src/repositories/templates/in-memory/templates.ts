/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import * as fs from 'fs';
import { TemplatesInterface } from '../../../models/interfaces/templates';
import { Template } from '../../../models/types/template';
import fileCheck from '../../../utils/fileCheck';

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
      const data = JSON.parse(readData) as Template;
      return data;
    }
    const err = { message: `Template not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  getAllTemplates() {
    fileCheck(`${__dirname}/data`, false);
    const allTemplates : Template[] = [];
    fs.readdirSync(`${__dirname}/data`).forEach((file) => {
      if (file !== 'html') {
        const toread = fs.readFileSync(`${__dirname}/data/${file}`).toString();
        const dataJson = JSON.parse(toread) as Template;
        allTemplates.push(dataJson);
      }
    });
    return allTemplates;
  }
}
