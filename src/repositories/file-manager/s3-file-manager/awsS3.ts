/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import AWS from 'aws-sdk';
import { FileManagerInterface } from '../../../models/interfaces/file-manager';
import { AWS_S3_CONFIG } from '../../../models/types/file-manager';

export class FileManagerAWSS3Repo implements FileManagerInterface {
  static config: AWS_S3_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'ap-south-1',
  };

  set = async (id: string, data: Buffer): Promise<{ success: boolean, message: string }> => {
    AWS.config.update(FileManagerAWSS3Repo.config);

    const s3 = new AWS.S3(FileManagerAWSS3Repo.config);
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: id,
      Body: data,
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
  get = async (id: string):
    Promise<{ success: boolean, data: Buffer | string }> => new Promise((resolve) => {
    try {
      AWS.config.update(FileManagerAWSS3Repo.config);
      const s3 = new AWS.S3(FileManagerAWSS3Repo.config);
      const options = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: id,
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
      resolve({ success: false, data: err });
    }
  })

  // TODO: Implement
  delete = async (id: string): Promise<{ success: boolean, message: string }> => new Promise((resolve) => {
    try {
      AWS.config.update(FileManagerAWSS3Repo.config);
      const s3 = new AWS.S3(FileManagerAWSS3Repo.config);
      const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: id,
      };
      s3.deleteObject(params, (err, data) => {
        if (err) {
          resolve({ success: false, message: err.message });
        } else {
          resolve({ success: true, message: data.RequestCharged });
        }
      });
    } catch (err) {
      resolve({ success: false, message: err });
    }
  });

  list: (id: string) => Promise<{ success: boolean; data: string[]; }>;

  exists: (id: string) => Promise<boolean>;
}
