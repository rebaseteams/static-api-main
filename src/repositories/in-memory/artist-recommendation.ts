import * as fs from 'fs';
import * as _ from 'underscore';
// import * as dummyArtistRecommendations from './/artist-recommendations.json';
import { ArtistRecommendationRepoInterface } from '../../models/interfaces/artist-recommendation';
import {
  ARec,
  ArtistRecommendation,
} from '../../models/types/artist-recommendation';

const {
  uniqueNamesGenerator, adjectives, colors, animals,
} = require('unique-names-generator');

export default class InMemoryArtistRecommendationRepo implements ArtistRecommendationRepoInterface {
  // private artistRecommendationList : ArtistRecommendation[] = dummyArtistRecommendations;

  // eslint-disable-next-line class-methods-use-this
  private simulatorRecommendations(
    artistRecommendation: ArtistRecommendation,
  ): ArtistRecommendation {
    const fakeArtists: Array<ARec> = [];
    _.times(10, (n) => {
      fakeArtists.push({
        artist: {
          artistName: uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }),
          artistId: `artist-${n}`,
          brands: [],
          venues: [],
        },
        // TODO: Can do later
        summary: `test summary ${n}`,
      });
    });

    // eslint-disable-next-line no-param-reassign
    artistRecommendation.artists = fakeArtists;

    return artistRecommendation;
  }

  // eslint-disable-next-line class-methods-use-this
  getArtistRecommendation(id: string): ArtistRecommendation | null {
    const file = fs.readFileSync(`./${id}`).toString();
    if (file) {
      return JSON.parse(file) as ArtistRecommendation;
    }

    return null;
  }

  // Save the data to the jsson file and update the sattus to true.
  addNewRecommendation(artistRecommendation: ArtistRecommendation): Boolean {
    // eslint-disable-next-line no-param-reassign
    artistRecommendation.status = false;
    try {
      if (!fs.existsSync('./database')) {
        fs.mkdirSync('database');
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    fs.writeFileSync(
      `./database/${artistRecommendation.concertData.id}`,
      JSON.stringify(artistRecommendation),
    );

    // TODO:  Call the recommendation api in future to get the artist recommendation
    this.simulatorRecommendations(artistRecommendation);
    // eslint-disable-next-line no-param-reassign
    artistRecommendation.status = true;
    fs.writeFile(
      `./database/${artistRecommendation.concertData.id}`,
      JSON.stringify(artistRecommendation),
      () => {
        // eslint-disable-next-line no-console
        console.log('save the arists recomendation asynchronously');
      },
    );

    return true;
  }
}
