import { FileManagerInterface } from '../models/interfaces/file-manager';

export class FileManagerService implements FileManagerInterface {
  private fileTransferRepo: FileManagerInterface;

  constructor(fileTransferRepo: FileManagerInterface) {
    this.fileTransferRepo = fileTransferRepo;
  }

  uploadFile = (id: string, data: Buffer):
    Promise<{ success: boolean, message: string }> => new Promise((resolve, reject) => {
    this.fileTransferRepo.uploadFile(id, data).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });

  downloadFile = (id: string):
    Promise<{ success: boolean, data: Buffer | string }> => new Promise((resolve, reject) => {
    this.fileTransferRepo.downloadFile(id).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}
