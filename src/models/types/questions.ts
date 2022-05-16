import { ArtistBudget } from './artist-budget';
import { ShortBrand } from './brand';
import { EventsType } from './events-type';
import { TargetAudience } from './target-audience';
import { Venue } from './venue';
import { WhatSellsMost } from './what-sells-most';

export type Questions = {
        id: string;
        userId: string;
        concertName: string;
        eventType: EventsType;
        venue: Array<Venue>;
        artistBudget: ArtistBudget;
        sponsorshipType: string,
        wantedBrands: Array<ShortBrand>;
        unwantedBrands: Array<ShortBrand>;
        targetAudience: TargetAudience;
        whatSellsMost: WhatSellsMost;
        dateCreated: string;
}

export type QuestionsUI = {
        userId: string;
        concertName: string;
        eventType: string;
        venue: Array<string>;
        artistBudget:{'min': number, 'max':number};
        sponsorshipType :string;
        wantedBrands: Array<string>;
        unwantedBrands: Array<string>;
        targetAudience: TargetAudience;
        whatSellsMost: WhatSellsMost;
}

export type ConcertCreationResponse = {
        id: string;
        concertName: string;
        status: boolean;
        dateCreated: string;
}
