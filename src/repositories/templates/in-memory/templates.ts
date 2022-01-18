/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { FileManagerInterface } from '../../../models/interfaces/file-manager';
import { TemplatesInterface } from '../../../models/interfaces/templates';
import { Template } from '../../../models/types/template';

export default class InMemoryTemplatesRepo implements TemplatesInterface {
  fileManager: FileManagerInterface;

  constructor(fileManager: FileManagerInterface) {
    this.fileManager = fileManager;
  }

  createTemplate() {
    console.log('TODO : Create Template');
  }

  editTemplate() {
    console.log('TODO : Edit Template');
  }

  async getTemplate(id : string) {
    const exists = await this.fileManager.exists(`templates/${id}.json`);

    if (exists) {
      const readData = await this.fileManager.get(`templates/${id}.json`);
      const data = JSON.parse(readData.data.toString()) as Template;
      return data;
    }
    const err = { message: `Template not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getAllTemplates() {
    // fileCheck(`${__dirname}/data`, false);

    const allTemplates : Template[] = [];
    const files = await this.fileManager.list('templates');

    for (let ind = 0; ind < files.data.length; ind++) {
      const file = files[ind];
      const toread = await this.fileManager.get(`templates/${file}`);
      const template = JSON.parse(toread.data.toString()) as Template;
      allTemplates.push(template);
    }

    return allTemplates;
  }
}
