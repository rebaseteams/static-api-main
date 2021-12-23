import axios from 'axios';
import fs from 'fs';
import config from './config.json';
import { DocusignInterface } from '../../../models/interfaces/docusign';
import fileCheck from '../../../utils/fileCheck';

export class InMemoryDocusignRep implements DocusignInterface {
  async createEnvelope(envelopeData: any): Promise<any> {
    return new Promise((resolve) => {
      try {
        axios.post(`${config.docusign.base_uri}/envelopes`, envelopeData, config.docusign.config).then((response) => {
          fileCheck(`${__dirname}/data`, false);
          if (!fs.existsSync(`${__dirname}/data/envelopes.json`)) {
            fs.writeFileSync(`${__dirname}/data/envelopes.json`, '[]');
          }
          const envelopes: Array<any> = JSON.parse(fs.readFileSync(`${__dirname}/data/envelopes.json`, 'utf-8'));
          envelopes.push(response.data);
          fs.writeFileSync(`${__dirname}/data/envelopes.json`, JSON.stringify(envelopes));
          resolve(response.data);
        });
      } catch (error) {
        resolve(error);
      }
    });
  }
}
