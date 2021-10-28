/* eslint-disable class-methods-use-this */
import ArtistType from '../models/types/Artist';
import artistRecommendations from '../infra/database/inmemory/artistRecommendations.json';

export default class ArtistService {
    private repo : ArtistType;

    constructor(repo : ArtistType) {
      this.repo = repo;
    }

    getArtist(id : string) {
      return this.repo.getArtist(id);
    }

    addArtist(artist : ArtistType) {
      return this.repo.addArtist(artist);
    }

    // eslint-disable-next-line no-unused-vars
    getRecommendation(id : string) {
      return artistRecommendations;
    }
}
