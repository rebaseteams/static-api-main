import * as fs from 'fs';
import { FileManagerInterface } from '../../../models/interfaces/file-manager';

export class FileManagerInmemoryRepo implements FileManagerInterface {
  uploadFile = async (id: string, data: Buffer): Promise<{ success: boolean, message: string }> => {
    fs.writeFileSync(`${__dirname}/data/${id}`, data.toString());
    return Promise.resolve({ success: true, message: 'Successfully Saved' });
  };

  downloadFile = async (id: string): Promise<{ success: boolean, data: Buffer | string }> => {
    const data = fs.readFileSync(`${__dirname}/data/${id}`).toString();
    return Promise.resolve({ success: true, data });
  }
}
