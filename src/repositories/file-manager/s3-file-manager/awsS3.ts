/* eslint-disable no-console */
import AWS from 'aws-sdk';
import { FileManagerInterface } from '../../../models/interfaces/file-manager';
import { AWS_S3_CONFIG, FileType } from '../../../models/types/file-manager';

export class FileManagerAWSS3Repo implements FileManagerInterface {
  private config: AWS_S3_CONFIG;

  uploadFile = async (id: string, folder: string, type: FileType, data: Buffer): Promise<{ success: boolean, message: string }> => {
    this.config = {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: 'ap-south-1',
    };
    AWS.config.update(this.config);

    const key = folder.length === 0 ? `${id}.${type}` : `${folder}/${id}.${type}`;

    const s3 = new AWS.S3(this.config);
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: JSON.stringify(data),
      folder,
      type,
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err, res: any) => {
        console.log(err, res);
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  };

  // eslint-disable-next-line no-unused-vars
  downloadFile = async (id: string, folder: string, type: FileType):
  Promise<{ success: boolean, data: Buffer | string }> => new Promise((resolve) => {
    try {
      this.config = {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: 'ap-south-1',
      };
      AWS.config.update(this.config);
      const s3 = new AWS.S3(this.config);
      const key = folder.length === 0 ? `${id}.${type}` : `${folder}/${id}.${type}`;
      const options = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
      };

      const fileStream = s3.getObject(options).createReadStream();
      const bufs = [];
      fileStream.on('data', (d) => { bufs.push(d); });
      fileStream.on('end', () => {
        const buf = Buffer.concat(bufs);
        resolve({ success: true, data: buf });
      });
      fileStream.on('error', (err) => resolve({ success: false, data: err.message }));
    } catch (err) {
      resolve({ success: false, data: null });
    }
  })
}
