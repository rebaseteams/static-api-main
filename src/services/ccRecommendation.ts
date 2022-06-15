import { CCRecommendationInterface } from '../models/interfaces/ccRecommendation';

export default class CCRecommendationService implements CCRecommendationInterface {
  private ccRecommendationRepo: CCRecommendationInterface;

  constructor(
    ccRecommendationRepo: CCRecommendationInterface,
  ) {
    this.ccRecommendationRepo = ccRecommendationRepo;
  }

  async generateRecommendation(id: string): Promise<{ success: boolean; }> {
    return this.ccRecommendationRepo.generateRecommendation(id);
  }

  async updateRecommendationStatus(): Promise<{ success: boolean; }> {
    return this.ccRecommendationRepo.updateRecommendationStatus();
  }
}
