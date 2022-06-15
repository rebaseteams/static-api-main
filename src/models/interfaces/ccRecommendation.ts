/* eslint-disable no-unused-vars */
export interface CCRecommendationInterface{
    generateRecommendation(id : string) : Promise<{ success : boolean }>;
    updateRecommendationStatus() : Promise<{ success : boolean }>;
  }
