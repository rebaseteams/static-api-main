import { Artist } from '../models/types/artist';
import {
  ArtistInterface,
} from '../models/interfaces/artist';
import { ArtistRecommendationInterface } from '../models/interfaces/artist-recommendation';
import { ConcertCreationResponse, QuestionsUI } from '../models/types/questions';
import { ArtistRecommendation, RecommendtionValidation } from '../models/types/artist-recommendation';

export default class ArtistService implements ArtistInterface, ArtistRecommendationInterface {
  private artistRepo: ArtistInterface;

  private artistRecommendationRepo: ArtistRecommendationInterface;

  constructor(
    artistRepo: ArtistInterface,
    artistRecommendationRepo: ArtistRecommendationInterface,
  ) {
    this.artistRepo = artistRepo;
    this.artistRecommendationRepo = artistRecommendationRepo;
  }

  async getArtist(id: string): Promise<Artist> {
    return this.artistRepo.getArtist(id);
  }

  async getArtists(skip: number, limit: number): Promise<Artist[]> {
    return this.artistRepo.getArtists(skip, limit);
  }

  async getRecommendationStatus(id : string) : Promise<{status : boolean}> {
    return this.artistRecommendationRepo.getRecommendationStatus(id);
  }

  async createRecommendation(questions : QuestionsUI) : Promise<ConcertCreationResponse> {
    const data = await this.artistRecommendationRepo.createRecommendation(questions);
    await this.generateRecommendedArtists(data.id);
    return data;
  }

  async generateRecommendedArtists(id : string) : Promise<{ success : boolean}> {
    const data = await this.getArtistCount(id);
    const artists = await this.artistRepo.getArtists(data.count, 10);
    return this.artistRecommendationRepo.generateRecommendedArtists(id, artists);
  }

  async getArtistCount(id : string) : Promise<{count : number}> {
    return this.artistRecommendationRepo.getArtistCount(id);
  }

  async getRecommendation(id : string) : Promise<ArtistRecommendation> {
    return this.artistRecommendationRepo.getRecommendation(id);
  }

  async getAllRecommendations(user_id: string) : Promise<ConcertCreationResponse[]> {
    return this.artistRecommendationRepo.getAllRecommendations(user_id);
  }

  async validateRecommendationFields(fields: RecommendtionValidation, user_id: string) : Promise<{nameAvailable: boolean}> {
    return this.artistRecommendationRepo.validateRecommendationFields(fields, user_id);
  }

  async deleteRecommendation(id : string) : Promise<{ success: boolean}> {
    return this.artistRecommendationRepo.deleteRecommendation(id);
  }

  async discardArtist(id : string, artistId : string) : Promise<{ success: boolean}> {
    const data = this.artistRecommendationRepo.discardArtist(id, artistId);
    const recommendation = await this.getRecommendation(id);
    if (recommendation.artists.length <= 5) this.generateRecommendedArtists(id);
    return data;
  }

  async registerDocument(id : string, docid : string) : Promise<{ success: boolean}> {
    return this.artistRecommendationRepo.registerDocument(id, docid);
  }
}
