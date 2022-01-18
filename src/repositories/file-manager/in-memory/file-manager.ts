import * as fs from 'fs';
import { FileManagerInterface } from '../../../models/interfaces/file-manager';

export class FileManagerInmemoryRepo implements FileManagerInterface {
  set = async (id: string, data: Buffer): Promise<{ success: boolean, message: string }> => {
    fs.writeFileSync(`${__dirname}/data/${id}`, data.toString());
    return Promise.resolve({ success: true, message: 'Successfully Saved' });
  };

  get = async (id: string): Promise<{ success: boolean, data: Buffer | string }> => {
    const data = fs.readFileSync(`${__dirname}/data/${id}`).toString();
    return Promise.resolve({ success: true, data });
  }

  delete = async (id: string): Promise<boolean> => {
    fs.unlinkSync(`${__dirname}/data/${id}`);
    return true;
  }

  list = async (id: string): Promise<{ success: boolean; data: string[]; }> => {
    const data = [];
    fs.readdirSync(`${__dirname}/data/${id}`).forEach((file) => {
      data.push(file);
    });

    return { success: true, data };
  }

  exists = async (id: string): Promise<boolean> => fs.existsSync(`${__dirname}/data/${id}`)
}
