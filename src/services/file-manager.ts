import { FileManagerInterface } from '../models/interfaces/file-manager';
import { FileType } from '../models/types/file-manager';

export class FileManagerService implements FileManagerInterface {
  private fileTransferRepo: FileManagerInterface;

  constructor(fileTransferRepo: FileManagerInterface) {
    this.fileTransferRepo = fileTransferRepo;
  }

  uploadFile = (id: string, folder: string, type: FileType, data: Buffer):
    Promise<{ success: boolean, message: string }> => new Promise((resolve, reject) => {
    this.fileTransferRepo.uploadFile(id, folder, type, data).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });

  downloadFile = (id: string, folder: string, type: FileType):
    Promise<{ success: boolean, data: Buffer }> => new Promise((resolve, reject) => {
    this.fileTransferRepo.downloadFile(id, folder, type).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}
