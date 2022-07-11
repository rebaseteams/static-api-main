/* eslint-disable no-unused-vars */
import AWS from 'aws-sdk';
import path from 'path';
import { FileManagerInterface } from '../../../models/interfaces/file-manager';
import { AWS_S3_CONFIG } from '../../../models/types/file-manager';

export class FileManagerAWSS3Repo implements FileManagerInterface {
  static config: AWS_S3_CONFIG;

  static initConfig = () => {
    FileManagerAWSS3Repo.config = {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION_US,
    };
  }

  s3: AWS.S3;

  AWS_S3_BUCKET: string

  constructor(AWS_S3_BUCKET: string) {
    AWS.config.update(FileManagerAWSS3Repo.config);
    this.s3 = new AWS.S3(FileManagerAWSS3Repo.config);
    this.AWS_S3_BUCKET = AWS_S3_BUCKET;
  }

  set = async (id: string, data: Buffer): Promise<{ success: boolean, message: string }> => {
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: id,
      Body: data,
    };

    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err, res: any) => {
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
      const options = {
        Bucket: this.AWS_S3_BUCKET,
        Key: id,
      };

      const fileStream = this.s3.getObject(options).createReadStream();
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
      const params = {
        Bucket: this.AWS_S3_BUCKET,
        Key: id,
      };
      this.s3.deleteObject(params, (err, data) => {
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

  list = async (id: string): Promise<{ success: boolean; data: string[]; }> => {
    const params: AWS.S3.ListObjectsRequest = {
      Bucket: this.AWS_S3_BUCKET,
      Prefix: `${id}/`,
    };

    try {
      const result = await this.s3.listObjects(params).promise();
      if (result.$response.error) {
        return { success: false, data: [result.$response.error.message] };
      }

      const keys = result.Contents.map((content) => path.parse(content.Key).base);

      return { success: true, data: keys };
    } catch (error) {
      return { success: false, data: [error] };
    }
  }

  exists = async (id: string): Promise<boolean> => {
    const params: AWS.S3.HeadObjectRequest = {
      Bucket: this.AWS_S3_BUCKET,
      Key: id,
    };

    try {
      const result = await this.s3.headObject(params).promise();
      if (result.$response.error) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };
}
