import * as moment from 'moment';
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
import { ArtistRecommendation } from '../models/types/artist-recommendation';
import { ArtistRecommendationRepoInterface } from '../models/interfaces/artist-recommendation';

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

  getRecommendation(id: string): ArtistRecommendation | null {
    return this.artistRecommendationRepo.getArtistRecommendation(id);
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
      dateCreated: moment().unix().toString(),
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
        softDrints: [],
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
}
