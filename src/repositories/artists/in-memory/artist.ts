/* eslint-disable no-throw-literal */
import Artist from '../../../models/entities/Artist';
import dummyArtists from './data/artists.json';
import { ArtistInterface } from '../../../models/interfaces/artist';

export default class InMemoryArtistRepo implements ArtistInterface {
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

  addArtist(artist: Artist): Boolean {
    // Search for artist in the list. If found then dont add
    const artistFound = this.artistList.find((a) => a.id === artist.id);
    if (artistFound) {
      return false;
    }

    this.artistList.push(artist);
    return true;
  }
}
