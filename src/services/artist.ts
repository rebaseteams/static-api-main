import { Artist } from '../models/types/artist';
import { ArtistServiceInteface, ArtistRepoInterface } from '../models/interfaces/artist';
import { ArtistRecommendation } from '../models/types/artist-recommendation';
import { ArtistRecommendationRepoInterface } from '../models/interfaces/artist-recommendation';

export default class ArtistService implements ArtistServiceInteface {
  private artistRepo: ArtistRepoInterface;

  private artistRecommendationRepo: ArtistRecommendationRepoInterface;

  constructor(artistRepo : ArtistRepoInterface, artistRecommendationRepo: ArtistRecommendationRepoInterface) {
    this.artistRepo = artistRepo;
    this.artistRecommendationRepo = artistRecommendationRepo;
  }

  getArtist(id: string): Artist | { message: string; } {
    return this.artistRepo.getArtist(id);
  }

  addArtist(artist: Artist): Boolean {
    return this.artistRepo.addArtist(artist);
  }

  getRecommendation(id: string): ArtistRecommendation[] {
    return this.artistRecommendationRepo.getArtistRecommendations(id);
  }
}