/* eslint-disable no-unused-vars */

import { FileType } from '../types/file-manager';

export interface FileManagerInterface {
  set: (id: string, data: Buffer) => Promise<{ success: boolean, message: string }>;
  get: (id: string) => Promise<{ success: boolean, data: Buffer | string }>;
  delete: (id: string) => Promise<boolean>;
  list: (id: string) => Promise<{ success: boolean, data: Array<string> }>;
  exists: (id: string) => Promise<boolean>;
}
