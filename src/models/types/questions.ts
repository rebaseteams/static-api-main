import { artistBudget } from './artist-budget';
import { targetAudience } from './target-audience';
import { whatSellsMost } from './what-sells-most';

export type Questions = {

        userId: String;
        formName: String;
        eventType: String;
        venue: Array<String>;
        artistBudget: artistBudget;
        sponsorshipType: String,
        wantedBrands: Array<String>;
        unwantedBrands: Array<String>;
        targetAudience: targetAudience;
        whatSellsMost: whatSellsMost;

}
