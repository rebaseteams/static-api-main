/* eslint-disable no-console */
import axios from 'axios';
import { CCRecommendationInterface } from '../../../models/interfaces/ccRecommendation';

export default class CCRecommendationRepo implements CCRecommendationInterface {
    Uri: string;

    constructor(cc_recomm_server: string) {
      this.Uri = `${cc_recomm_server}/artist-recommendation`;
    }

    generateRecommendation = async (id: string): Promise<{ success: boolean; }> => new Promise((resolve, reject) => {
      axios.post(this.Uri, { id }).then(() => {
        resolve({
          success: true,
        });
      }).catch((err) => {
        reject(err);
      });
    })
}
