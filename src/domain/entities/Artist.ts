import Brand from './Brand';
import Venue from './Venue';

export default class Artist {
    private artistName : string;

    private artistId : string;

    private summary : string;

    private brands : Array<Brand>;

    private venues : Array<Venue>;

    constructor(
      artistName : string,
      artistId : string,
      summary : string,
      brands : Array<Brand>,
      venues : Array<Venue>,
    ) {
      this.artistName = artistName;
      this.artistId = artistId;
      this.summary = summary;
      this.brands = brands;
      this.venues = venues;
    }
}
