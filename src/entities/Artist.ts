export class Artist {
    private artist_name : string;
    private artist_id : string;
    private summary : string;
    
    constructor(artist_name : string, artist_id : string, summary : string) {
        this.artist_name = artist_name;
        this.artist_id = artist_id;
        this.summary = summary;
    }
}