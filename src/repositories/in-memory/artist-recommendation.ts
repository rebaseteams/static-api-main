import * as dummyArtistRecommendations from './data/artist-recommendations.json';
import { ArtistRecommendationRepoInterface } from '../../models/interfaces/artist-recommendation';
import { ArtistRecommendation } from '../../models/types/artist-recommendation';

export default class InMemoryArtistRecommendationRepo implements ArtistRecommendationRepoInterface {
  private artistRecommendationList : ArtistRecommendation[] = dummyArtistRecommendations;

  getArtistRecommendations(id: string): ArtistRecommendation[] {
    if (id) {
      return this.artistRecommendationList;
    }

    return this.artistRecommendationList;
  }

  addNewRecommendation(artistRecoomendation: ArtistRecommendation): Boolean {
    if (artistRecoomendation) {
      this.artistRecommendationList.push(artistRecoomendation);
      return true;
    }
    return false;
  }
}
