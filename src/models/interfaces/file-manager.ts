/* eslint-disable no-unused-vars */

import { FileType } from '../types/file-manager';

export interface FileManagerInterface {
  uploadFile: (id: string, data: Buffer) => Promise<{ success: boolean, message: string }>;
  downloadFile: (id: string) => Promise<{ success: boolean, data: Buffer | string }>;
}
