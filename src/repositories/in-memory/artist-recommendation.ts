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
    // _.times(10, (n) => {
    // fakeArtists.push({
    //   artist: {
    //     artistName: uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }),
    //     artistId: `artist-${n}`,
    //     brands: [],
    //     venues: [],
    //   },
    //   // TODO: Can do later
    //   summary: `test summary ${n}`,
    // });
    _.times(10, (n) => {
      fakeArtists.push({
        artistId: `artist-${n}`,
        artistName: uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }),
        artistImage: 'https://source.unsplash.com/200x200/?avatar',
        matchPercentage: (90 - n),
        matchAttributes: {
          venues: [
            {
              id: '11111',
              name: 'Parade Hall',
              address: {
                pincode: 111022,
                country: 'USA',
                city: 'london',
                geoLocation: {
                  lat: 40,
                  long: 80,
                },
              },
              venueCapacity: 12000,
              matchPercentage: 80,
            },
          ],
          age: {
            ageGroup: '18-30',
            matchPercentage: 90,
          },
          gender: {
            male: 10,
            female: 90,
          },
          genre: [
            {
              genreName: 'Hollywood',
              matchPercentage: 94,
            },
          ],
          associatedBrands: [
            {
              id: '22222',
              name: 'Apple',
              contact: '002233',
              website: 'https://apple.com',
              logoUrl: '//logo.clearbit.com/apple.com',
            },
            {
              id: '22223',
              name: 'Google',
              contact: '0022643',
              website: 'https://google.com',
              logoUrl: '//logo.clearbit.com/google.com',
            },
          ],
        },
        summary: `${uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] })} is popular single with a lots of hits`,
      });
    });

    // eslint-disable-next-line no-param-reassign
    artistRecommendation.artists = fakeArtists;

    return artistRecommendation;
  }

  // eslint-disable-next-line class-methods-use-this
  getArtistRecommendation(id: string): ArtistRecommendation | { error : string} {
    try {
      if (fs.existsSync(`./database/${id}`)) {
        const file = fs.readFileSync(`./database/${id}`).toString();
        return JSON.parse(file) as ArtistRecommendation;
      }
      return { error: 'Recommendation not found' };
    } catch (e : any) {
      return { error: e.message };
    }
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
