/* eslint-disable no-unused-vars */

import { FileManagerInterface } from '../models/interfaces/file-manager';

export class FileManagerService implements FileManagerInterface {
  private fileTransferRepo: FileManagerInterface;

  constructor(fileTransferRepo: FileManagerInterface) {
    this.fileTransferRepo = fileTransferRepo;
  }

  // TODO
  delete: (id: string) => Promise<boolean>;

  list: (id: string) => Promise<{ success: boolean; data: string[]; }>;

  exists: (id: string) => Promise<boolean>;

  set = (id: string, data: Buffer):
    Promise<{ success: boolean, message: string }> => new Promise((resolve, reject) => {
    this.fileTransferRepo.set(id, data).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });

  get = (id: string):
    Promise<{ success: boolean, data: Buffer | string }> => new Promise((resolve, reject) => {
    this.fileTransferRepo.get(id).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}
