/* eslint-disable no-console */
import axios from 'axios';
import { CCRecommendationInterface } from '../../../models/interfaces/ccRecommendation';

export default class CCRecommendationRepo implements CCRecommendationInterface {
    Uri: string;

    constructor(cc_recomm_server: string) {
      this.Uri = `${cc_recomm_server}/artist-recommendation`;
    }

    async generateRecommendation(id: string): Promise<{ success: boolean; }> {
      axios.post(this.Uri, { id });
      return { success: true };
    }
}
