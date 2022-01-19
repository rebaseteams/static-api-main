/* eslint-disable class-methods-use-this */
import { FileManagerInterface } from '../../../models/interfaces/file-manager';
import { TemplatesInterface } from '../../../models/interfaces/templates';
import { Template } from '../../../models/types/template';

export default class InMemoryTemplatesRepo implements TemplatesInterface {
  fileManager: FileManagerInterface;

  templatesDir: string;

  constructor(fileManager: FileManagerInterface) {
    this.fileManager = fileManager;
    this.templatesDir = 'templates';
  }

  createTemplate() {
    // eslint-disable-next-line no-console
    console.log('TODO : Create Template');
  }

  editTemplate() {
    // eslint-disable-next-line no-console
    console.log('TODO : Edit Template');
  }

  async getTemplate(id : string): Promise<Template> {
    try {
      const exists = await this.fileManager.exists(`templates/${id}.json`);
      if (exists) {
        const readData = await this.fileManager.get(`templates/${id}.json`);
        const data = JSON.parse(readData.data.toString()) as Template;
        return data;
      }
      const err = { message: `Template not found for id: ${id}`, statusCode: 404 };
      throw err;
    } catch (err) {
      return err;
    }
  }

  async getAllTemplates(): Promise<Array<Template>> {
    // fileCheck(`${__dirname}/data`, false);

    try {
      const allTemplates : Template[] = [];
      const files = await this.fileManager.list(this.templatesDir);
      for (let ind = 0; ind < files.data.length; ind += 1) {
        const file = files.data[ind];
        const toread = await this.fileManager.get(`${this.templatesDir}/${file}`);
        const template = JSON.parse(toread.data.toString()) as Template;
        allTemplates.push(template);
      }

      return allTemplates;
    } catch (err) {
      return err;
    }
  }
}
