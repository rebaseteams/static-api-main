import { ArtistBudget } from './artist-budget';
import { Brand } from './brand';
import { TargetAudience } from './target-audience';
import { WhatSellsMost } from './what-sells-most';

export type Questions = {

        userId: String;
        formName: String;
        eventType: String;
        venue: Array<String>;
        artistBudget: ArtistBudget;
        sponsorshipType: String,
        wantedBrands: Array<Brand>;
        unwantedBrands: Array<Brand>;
        targetAudience: TargetAudience;
        whatSellsMost: WhatSellsMost;

}
