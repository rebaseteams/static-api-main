/* eslint-disable no-unused-vars */

type FileType = 'pdf' | 'jpeg' | 'image' | 'jpg' | 'png' | 'html' | 'docx';

export interface FileManagerInterface {
  uploadFile: (id: string, folder: string, type: FileType, data: Buffer) => Promise<{ success: boolean, message: string }>;
  downloadFile: (id: string) => Promise<{ Success: boolean, data: Buffer }>;
}
