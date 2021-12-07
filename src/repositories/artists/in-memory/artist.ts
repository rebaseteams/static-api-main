/* eslint-disable no-throw-literal */
import Artist from '../../../models/entities/Artist';
import dummyArtists from './data/artists.json';
import { ArtistInterface } from '../../../models/interfaces/artist';

export default class ArtistsRepo implements ArtistInterface {
  private artistList : Artist[];

  constructor() {
    this.artistList = dummyArtists.map((data: any) => data as Artist);
  }

  async getArtist(id: string): Promise<Artist> {
    const artist = this.artistList.find((a) => a.id === id);
    if (artist) {
      return artist;
    }

    throw { message: `Artist not found for id: ${id}`, statusCode: 404 };
  }
}
