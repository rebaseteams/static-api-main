import axios from 'axios';
import fs from 'fs';
import { DocusignInterface } from '../../../models/interfaces/docusign';
import fileCheck from '../../../utils/fileCheck';
import updateAccessToken from './regenerateAuthoriztion';

export class InMemoryDocusignRep implements DocusignInterface {
  async createEnvelope(envelopeData: any): Promise<any> {
    const api_call = async () => {
      const apiconfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${process.env.DOCUSIGN_ACCESS_TOKEN}`,
        },
      };
      return new Promise((resolve) => axios.post(`${process.env.DOCUSIGN_BASE_URI}/envelopes`, envelopeData, apiconfig).then((response) => {
        fileCheck(`${__dirname}/data`, false);
        if (!fs.existsSync(`${__dirname}/data/envelopes.json`)) {
          fs.writeFileSync(`${__dirname}/data/envelopes.json`, '[]');
        }
        const envelopes: Array<any> = JSON.parse(fs.readFileSync(`${__dirname}/data/envelopes.json`, 'utf-8'));
        envelopes.push(response.data);
        fs.writeFileSync(`${__dirname}/data/envelopes.json`, JSON.stringify(envelopes));
        resolve(response.data);
      }).catch(async (err) => {
        if (err.response.data.errorCode === 'USER_AUTHENTICATION_FAILED') {
          const result = await updateAccessToken();
          if (result) {
            api_call();
          }
          resolve('Failed refreshing');
        }
        resolve('Somthing went wrong');
      }));
    };
    return new Promise((resolve) => {
      try {
        api_call().then((result) => {
          resolve({ success: true, data: result });
        }).catch((err) => {
          resolve({ success: false, data: err });
        });
      } catch (error) {
        resolve({ success: false, error: error.message });
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
}
