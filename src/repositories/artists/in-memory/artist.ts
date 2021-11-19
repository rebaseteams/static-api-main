/* eslint-disable no-throw-literal */
import { Artist } from '../../../models/types/artist';
import * as dummyArtists from './data/artists.json';
import { ArtistRepoInterface } from '../../../models/interfaces/artist';

export default class InMemoryArtistRepo implements ArtistRepoInterface {
  private artistList : Artist[] = dummyArtists;

  getArtist(id: string): Artist {
    const artist = this.artistList.find((a) => a.artistId === id);
    if (artist) {
      return artist;
    }

    throw { message: `Artist not found for id: ${id}`, statusCode: 404 };
  }

  addArtist(artist: Artist): Boolean {
    // Search for artist in the list. If found then dont add
    const artistFound = this.artistList.find((a) => a.artistId === artist.artistId);
    if (artistFound) {
      return false;
    }

    this.artistList.push(artist);
    return true;
  }
}
