/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
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
    const err = { message: `Artist not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getArtists(skip: number, limit: number) : Promise<Artist[]> {
    let tracker = 0;
    const artists = this.artistList.filter((artist, ind) => {
      if (skip < ind && tracker < limit) {
        tracker += 1;
        return artist;
      }
    });
    return artists;
  }
}
