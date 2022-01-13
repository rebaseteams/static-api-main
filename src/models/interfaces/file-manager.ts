/* eslint-disable no-unused-vars */

import { FileType } from '../types/file-manager';

export interface FileManagerInterface {
  uploadFile: (id: string, folder: string, type: FileType, data: Buffer) => Promise<{ success: boolean, message: string }>;
  downloadFile: (id: string, folder: string, type: FileType) => Promise<{ success: boolean, data: Buffer }>;
}
