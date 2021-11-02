import { ArtistBudget } from './artist-budget';
// import { Brand } from './brand';
import { TargetAudience } from './target-audience';
// import { WhatSellsMost } from './what-sells-most';

export type Questions = {

        id: String;
        concertName: String;
        eventType: String;
        venue: Array<String>;
        artistBudget: ArtistBudget;
        sponsorshipType: String,
        wantedBrands: Array<String>;
        unwantedBrands: Array<String>;
        targetAudience: TargetAudience;
}
