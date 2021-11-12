// import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from '../models/types/artist';
import {
  ArtistServiceInteface,
  ArtistRepoInterface,
} from '../models/interfaces/artist';
import {
  ConcertCreationResponse,
  Questions,
  QuestionsUI,
} from '../models/types/questions';
import { ARec, ArtistRecommendation } from '../models/types/artist-recommendation';
import { ArtistRecommendationRepoInterface } from '../models/interfaces/artist-recommendation';
import { PatchRequest } from '../models/types/patch-request';

export default class ArtistService implements ArtistServiceInteface {
  private artistRepo: ArtistRepoInterface;

  private artistRecommendationRepo: ArtistRecommendationRepoInterface;

  constructor(
    artistRepo: ArtistRepoInterface,
    artistRecommendationRepo: ArtistRecommendationRepoInterface,
  ) {
    this.artistRepo = artistRepo;
    this.artistRecommendationRepo = artistRecommendationRepo;
  }

  getArtist(id: string): Artist | { message: string } {
    return this.artistRepo.getArtist(id);
  }

  addArtist(artist: Artist): Boolean {
    return this.artistRepo.addArtist(artist);
  }

  getRecommendation(id: string): ArtistRecommendation | { error : string } {
    return this.artistRecommendationRepo.getArtistRecommendation(id);
  }

  getConcerts() : ConcertCreationResponse[] | { error : string } {
    return this.artistRecommendationRepo.getConcerts();
  }

  // The responsibility of this function is goint to be as followes
  // 1: Generate a uuid for the submitted concert
  // 2: Invoke the recommendations function to compute the recommendation
  // 3: send back uuid, dateCreated and concert name as response
  createNewRecommendation(questions: QuestionsUI): ConcertCreationResponse {
    // eslint-disable-next-line no-console
    console.log(questions);
    const questionsToSave: Questions = {
      id: uuidv4(),
      dateCreated: String(new Date()),
      userId: 'TODO',
      concertName: questions.concertName,
      eventType: questions.eventType,
      venue: questions.venue,
      artistBudget: questions.artistBudget,
      wantedBrands: questions.wantedBrands,
      unwantedBrands: questions.unwantedBrands,
      targetAudience: {
        ageGroup: questions.targetAudience.ageGroup,
        gender: questions.targetAudience.gender,
        genre: questions.targetAudience.genre,
      },
      sponsorshipType: questions.sponsorshipType,
      whatSellsMost: {
        beer: [],
        liquor: [],
        softDrinks: [],
      },
    };
    const artistRecommendation: ArtistRecommendation = {
      concertData: questionsToSave,
      artists: [],
      status: false,
    };

    this.artistRecommendationRepo.addNewRecommendation(artistRecommendation);

    return {
      id: questionsToSave.id,
      concertName: questionsToSave.concertName,
      status: artistRecommendation.status,
      dateCreated: questionsToSave.dateCreated,
    };
  }

  updateRecommendation(request: PatchRequest): { data:ARec[], success: Boolean} | { data:{ error : string}, success: Boolean} {
    const updatedArtistList = this.artistRecommendationRepo.updateDiscardedArtist(request);
    if (updatedArtistList) {
      return updatedArtistList;
    }
    return { data: { error: 'Error updating Recommendation' }, success: false };
  }

  deleteConcert(id: String): {formId: String, success: Boolean} | { error: String, success: Boolean} {
    const response = this.artistRecommendationRepo.deleteConcertData(id);
    if (response) {
      return response;
    }
    return { error: 'Error Deleting Concert Data', success: false };
  }
}
