/* eslint-disable class-methods-use-this */
import { createConnection, Repository } from 'typeorm';
import Artist from '../../../models/entities/Artist';
import { ArtistInterface } from '../../../models/interfaces/artist';

export default class ArtistsRepo implements ArtistInterface {
  private artistRepository : Repository<Artist>;

  constructor() {
    createConnection().then((connection) => {
      this.artistRepository = connection.getRepository(Artist);
    });
  }

  async getArtist(id : string) : Promise<Artist> {
    const artist = await this.artistRepository.findOne({ id });
    if (artist) return artist;
    const err = { message: `Artist not found for id: ${id}`, statusCode: 404 };
    throw err;
  }
}
