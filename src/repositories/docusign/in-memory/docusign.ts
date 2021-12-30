import axios from 'axios';
import fs from 'fs';
import config from './config.json';
import { DocusignInterface } from '../../../models/interfaces/docusign';
import fileCheck from '../../../utils/fileCheck';
import refreshAccessToken from './regenerateAuthoriztion';

export class InMemoryDocusignRep implements DocusignInterface {
  async createEnvelope(envelopeData: any): Promise<any> {
    let calls: number = 0;
    const api_call = (resolve) => {
      calls += 1;
      axios.post(`${config.docusign.base_uri}/envelopes`, envelopeData, config.docusign.config).then((response) => {
        fileCheck(`${__dirname}/data`, false);
        if (!fs.existsSync(`${__dirname}/data/envelopes.json`)) {
          fs.writeFileSync(`${__dirname}/data/envelopes.json`, '[]');
        }
        const envelopes: Array<any> = JSON.parse(fs.readFileSync(`${__dirname}/data/envelopes.json`, 'utf-8'));
        envelopes.push(response.data);
        fs.writeFileSync(`${__dirname}/data/envelopes.json`, JSON.stringify(envelopes));
        resolve(response.data);
      }).catch((err) => {
        if (err.response.data.errorCode === 'USER_AUTHENTICATION_FAILED') {
          refreshAccessToken();
          if (calls < 3) {
            api_call(resolve);
          }
        }
        resolve(err);
      });
    };
    return new Promise((resolve) => {
      try {
        api_call(resolve);
      } catch (error) {
        resolve(error);
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
