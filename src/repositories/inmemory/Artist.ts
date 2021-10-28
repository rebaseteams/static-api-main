import Brand from '../../models/types/Brand';
import ArtistType from '../../models/types/Artist';
import Venue from '../../models/types/Venue';
import Artists from '../../infra/database/inmemory/Artists.json';

export default class ArtistRepo implements ArtistType {
    artistName : string;

    artistId : string;

    summary : string;

    brands : Array<Brand>;

    venues : Array<Venue>;

    setValues({
      artistName, artistId, summary, brands, venues,
    }) {
      this.artistId = artistId;
      this.artistName = artistName;
      this.summary = summary;
      this.brands = brands;
      this.venues = venues;
    }

    getArtist(id : string) {
      let index : number;
      for (index = 0; index < Artists.length; index += 1) {
        const element = Artists[index];
        if (element.artistId === id) {
          this.setValues(element);
          return this;
        }
      }
      return { message: 'Not Found' };
    }

    addArtist(artist : ArtistType) {
      this.artistId = artist.artistId;
      this.artistName = artist.artistName;
      this.summary = artist.summary;
      this.brands = artist.brands;
      this.venues = artist.venues;
      Artists.push(this);
      return true;
    }
}
