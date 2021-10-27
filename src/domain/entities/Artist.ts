import { Brand } from "./Brand";
import { Venue } from "./Venue";

export class Artist {
    private artist_name : string;
    private artist_id : string;
    private summary : string;
    private brands : Array<Brand>;
    private venues : Array<Venue>;

    constructor(
        artist_name : string,
        artist_id : string,
        summary : string,
        brands : Array<Brand>,
        venues : Array<Venue>
        ) {
        this.artist_name = artist_name;
        this.artist_id = artist_id;
        this.summary = summary;
        this.brands = brands;
        this.venues = venues;
    }
}