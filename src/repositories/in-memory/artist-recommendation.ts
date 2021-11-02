import * as dummyArtistRecommendations from './data/concertData.json';
// import * as dummyArtistRecommendations from './data/artist-recommendations.json';
// import * as questionData from './data/questions.json';
import * as concertRecommendation from './data/concert-recommendation.json';
import { ArtistRecommendationRepoInterface } from '../../models/interfaces/artist-recommendation';
import { ArtistRecommendation } from '../../models/types/artist-recommendation';
import { ConcertRecommendation } from '../../models/types/concert-recommendation';

export default class InMemoryArtistRecommendationRepo implements ArtistRecommendationRepoInterface {
  private artistRecommendationList : ArtistRecommendation[] = dummyArtistRecommendations;

  // private userQuestionlist : ArtistRecommendation[] = questionData;

  private conertRecommendation: ArtistRecommendation[] = dummyArtistRecommendations

  private userRecommendationList : ConcertRecommendation[] = concertRecommendation;

  getArtistRecommendations(id: string): ArtistRecommendation | {message: String} {
    const foundRecommendation = this.conertRecommendation.find((a) => a.id === id);
    if (foundRecommendation) {
      return foundRecommendation;
    }
    return { message: 'Recommendation Not Found' };
  }

  addNewRecommendation(artistRecoomendation: ArtistRecommendation): Boolean {
    if (artistRecoomendation) {
      this.artistRecommendationList.push(artistRecoomendation);
      return true;
    }
    return false;
  }

  updateConcertRecommendation(userSelection: ConcertRecommendation): Boolean {
    const userFound = this.userRecommendationList.find((a) => a.userId === userSelection.userId);

    if (userFound) {
      // const filteredList = this.userRecommendationList.filter((a) => a.concertName !== userFound.questions?.concertName);
      // if (filteredList) {
      //   this.userRecommendationList.push(userSelection);
      // }
      // this.userRecommendationList;
      return true;
    }
    return false;
  }
}
