/* eslint-disable no-unused-vars */
export interface CCRecommendationInterface{
    generateRecommendation(id : string) : Promise<{ success : boolean }>;
    updateRecommendationStatus(sleepTime: string) : Promise<{ success : boolean }>;
  }
