import { ArtistBudget } from './artist-budget';
import { Brand } from './brand';
import { TargetAudience } from './target-audience';
import { WhatSellsMost } from './what-sells-most';

export type Questions = {
        id: string;
        userId: string;
        concertName: string;
        eventType: string;
        venue: Array<string>;
        artistBudget: ArtistBudget;
        sponsorshipType: string,
        wantedBrands: Array<Brand>;
        unwantedBrands: Array<Brand>;
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
        wantedBrands: Array<Brand>;
        unwantedBrands: Array<Brand>;
        targetAudience: TargetAudience;
        whatSellsMost: WhatSellsMost;
}

export type ConcertCreationResponse = {
        id: string;
        concertName: string;
        status: boolean;
        dateCreated: string;
}
