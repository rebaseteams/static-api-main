import axios, { AxiosRequestConfig } from 'axios';
import fs from 'fs';
import path from 'path';
import { CreateEnvelopeResponseData, DocusignInterface } from '../../../models/interfaces/docusign';
import { EnvelopeData } from '../../../models/types/docusign';
import fileCheck from '../../../utils/fileCheck';
import updateAccessToken from './regenerateAuthoriztion';

const html_to_pdf = require('html-pdf-node');

export class DocusignRepo implements DocusignInterface {
  async createEnvelope(envelopeData: EnvelopeData): Promise<{ success: boolean; data?: CreateEnvelopeResponseData }> {
    const api_call = async (): Promise<CreateEnvelopeResponseData | string> => {
      const apiconfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${process.env.DOCUSIGN_ACCESS_TOKEN}`,
        },
      };
      const options = { format: 'A4' };
      const file = { content: envelopeData.documents[0].documentBase64 };
      const pdfBuffer = await html_to_pdf.generatePdf(file, options);
      const base64 = pdfBuffer.toString('base64');
      // eslint-disable-next-line no-param-reassign
      envelopeData.documents[0].documentBase64 = base64;

      return new Promise((resolve, reject) => axios.post(`${process.env.DOCUSIGN_BASE_URI}/envelopes`, envelopeData, apiconfig).then((response: any) => {
        fileCheck(`${__dirname}/data`, false);
        if (!fs.existsSync(`${__dirname}/data/envelopes.json`)) {
          fs.writeFileSync(`${__dirname}/data/envelopes.json`, '[]');
        }
        const envelopes: Array<any> = JSON.parse(fs.readFileSync(`${__dirname}/data/envelopes.json`, 'utf-8'));
        envelopes.push(response.data);
        fs.writeFileSync(`${__dirname}/data/envelopes.json`, JSON.stringify(envelopes));
        resolve(response.data as CreateEnvelopeResponseData);
      }).catch(async (err) => {
        if (err.response.data.errorCode === 'USER_AUTHENTICATION_FAILED') {
          const result = await updateAccessToken();
          if (result) {
            api_call();
            resolve('Token Refreshed');
          } else {
            resolve('Failed refresh');
          }
        }
        reject(err);
      }));
    };

    return new Promise((resolve) => {
      try {
        api_call().then((result) => {
          if (typeof (result) !== 'string') resolve({ success: true, data: result });
          resolve({ success: false });
        }).catch((err) => {
          resolve({ success: false, data: err });
        });
      } catch (error) {
        resolve({ success: false, data: error.message });
      }
    });
  }

  async getAllEnvelopes(): Promise<any[]> {
    return new Promise((resolve) => {
      try {
        fileCheck(`${__dirname}/data`, false);
        if (!fs.existsSync(`${__dirname}/data/envelopes.json`)) {
          fs.writeFileSync(`${__dirname}/data/envelopes.json`, '[]');
        }
        const envelopes = JSON.parse(fs.readFileSync(`${__dirname}/data/envelopes.json`, 'utf-8'));
        resolve(envelopes);
      } catch (err) {
        resolve(err);
      }
    });
  }

  // eslint-disable-next-line no-unused-vars
  async getEnvelopeStatus(envelopeId: string, documentId: string): Promise<any> {
    const api_call = async () => {
      const apiconfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${process.env.DOCUSIGN_ACCESS_TOKEN}`,
        },
      };
      return new Promise((resolve) => axios.get(`${process.env.DOCUSIGN_BASE_URI}/envelopes/${envelopeId}`, apiconfig).then((response) => {
        resolve({ success: true, data: response.data });
      }).catch(async (err) => {
        if (err.response.data.errorCode === 'USER_AUTHENTICATION_FAILED') {
          const result = await updateAccessToken();
          if (result) {
            api_call();
          }
          resolve({ success: false, data: 'Failed refreshing' });
        }
        resolve({ success: false, data: err });
      }));
    };

    return new Promise((resolve) => {
      try {
        api_call().then((result) => {
          resolve(result);
        }).catch((err) => {
          resolve(err);
        });
      } catch (error) {
        resolve({ success: false, error: error.message });
      }
    });
  }

  async getSignedPdf(envelopeId: string): Promise<{ success: boolean, pdf: string | null }> {
    const getSigned = (): Promise<string | null> => {
      const apiconfig: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${process.env.DOCUSIGN_ACCESS_TOKEN}`,
        },
        responseType: 'stream',
      };
      return new Promise((resolve) => axios.get(`${process.env.DOCUSIGN_BASE_URI}/envelopes/${envelopeId}/documents/combined`, apiconfig).then((response) => {
        //  cheking if the folders are available or not
        fileCheck(`${__dirname}/data`, false);
        fileCheck(`${__dirname}/data/signed`, false);

        // file name
        const filename = `${envelopeId}.pdf`;
        const tempFile = path.resolve(`${__dirname}/data/signed`, filename); // file path

        // generate a file stream
        response.data.pipe(fs.createWriteStream(tempFile));

        response.data.on('end', () => {
          // file has been download
          const data = fs.readFileSync(tempFile);
          const signedBase64 = Buffer.from(data).toString('base64');
          resolve(signedBase64);
        });

        response.data.on('error', (err) => {
          // error in download
          resolve(err);
        });
      }).catch(async (err) => {
        // Updating the access_token
        const result = await updateAccessToken();
        if (result) {
          const data = await getSigned();
          resolve(data);
        }
        resolve(err);
      }));
    };
    return new Promise((resolve) => {
      // TODO should check if the signed pdf is available on S# bucket
      // if yes send that in response
      // else get it using docusign api
      try {
        getSigned().then((result) => {
          resolve({ success: true, pdf: result });
        }).catch((err) => {
          if (err.length > 150) err.slice(0, 150);
          resolve({ success: false, pdf: err });
        });
      } catch (error) {
        if (error.length > 150) error.slice(0, 150);
        resolve({ success: false, pdf: error });
      }
    });
  }
}