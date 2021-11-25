/* eslint-disable no-throw-literal */
import * as fs from 'fs';
import * as _ from 'underscore';
import { first, last, place } from 'random-name';
import * as faker from 'faker';
// import * as dummyArtistRecommendations from './/artist-recommendations.json';
import { ArtistRecommendationRepoInterface } from '../../../models/interfaces/artist-recommendation';
import {
  ARec,
  ArtistRecommendation,
} from '../../../models/types/artist-recommendation';
import { PatchRequest } from '../../../models/types/patch-request';
import { ConcertCreationResponse } from '../../../models/types/questions';
import fileCheck from '../../../utils/fileCheck';

export default class InMemoryArtistRecommendationRepo implements ArtistRecommendationRepoInterface {
  // private artistRecommendationList : ArtistRecommendation[] = dummyArtistRecommendations;

  // eslint-disable-next-line class-methods-use-this
  private simulatorRecommendations(
    artistRecommendation: ArtistRecommendation,
    artists: Array<ARec>,
    // eslint-disable-next-line no-unused-vars
    discardedArtist?: Array<ARec>,
  ): ArtistRecommendation {
    const fakeArtists: Array<ARec> = [];
    const noOfData: number = (10 - artists.length);
    const multipleDataGenrator = (m:number) => {
      _.times(m, (n) => {
        const artistname: string = `${first()} ${last()}`;
        const eventPlace: string = `${place()}`;
        let gender: string;
        if (Math.random() > 0.5) {
          gender = 'men';
        } else {
          gender = 'women';
        }
        fakeArtists.push({
          artistId: `artist-${n}`,
          artistName: artistname,
          artistGender: gender,
          artistImage: `https://randomuser.me/api/portraits/${gender}/${faker.datatype.number(80)}.jpg`,
          matchPercentage: Number((90 - (Math.random() * 50)).toFixed(0)),
          matchAttributes: {
            venues: [
              {
                id: '11111',
                name: eventPlace,
                address: {
                  pincode: Number(faker.address.zipCode()),
                  country: faker.address.country(),
                  city: faker.address.cityName(),
                  geoLocation: {
                    lat: Number(faker.address.latitude()),
                    long: Number(faker.address.longitude()),
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
          summary: `${artistname} is very popular singar with a lots of hits and nice musics.`,
        });
      });
    };
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
    multipleDataGenrator(noOfData);
    fakeArtists.sort((a, b) => b.matchPercentage - a.matchPercentage);
    // eslint-disable-next-line no-param-reassign
    artistRecommendation.artists = fakeArtists;

    return artistRecommendation;
  }

  // eslint-disable-next-line class-methods-use-this
  getArtistRecommendation(id: string): ArtistRecommendation {
    if (fs.existsSync(`./database/${id}`)) {
      const file = fs.readFileSync(`./database/${id}`).toString();
      const dataJson = JSON.parse(file) as ArtistRecommendation;
      dataJson.artists = dataJson.artists.slice(0, 10);
      return dataJson;
    }
    throw { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
  }

  // eslint-disable-next-line class-methods-use-this
  getConcerts(): ConcertCreationResponse[] {
    const allConcerts : ConcertCreationResponse[] = [];
    fileCheck('./database', false);
    fs.readdirSync('./database/').forEach((file) => {
      const toread = fs.readFileSync(`./database/${file}`).toString();
      const dataJson = JSON.parse(toread) as ArtistRecommendation;
      const concertData = {
        id: dataJson.concertData.id,
        concertName: dataJson.concertData.concertName,
        status: dataJson.status,
        dateCreated: dataJson.concertData.dateCreated,
      };
      allConcerts.push(concertData);
    });
    return allConcerts;
  }

  // Save the data to the jsson file and update the status to true.
  addNewRecommendation(artistRecommendation: ArtistRecommendation): Boolean {
    // eslint-disable-next-line no-param-reassign
    artistRecommendation.status = false;

    const fileName = artistRecommendation.concertData.id;
    fileCheck(`./database/${fileName}`);

    // TODO:  Call the recommendation api in future to get the artist recommendation
    this.simulatorRecommendations(artistRecommendation, []);
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

  // eslint-disable-next-line class-methods-use-this
  updateDiscardedArtist(request: PatchRequest): { success: Boolean } {
    const fileData = fs.readFileSync(`./database/${request.formId}`, 'utf8');
    const fileDataObject: ArtistRecommendation = JSON.parse(fileData);
    if (fileDataObject) {
      const discardedArtistData = fileDataObject.artists.find((a) => a.artistId === request.discardedArtistId);
      const newArtistList = fileDataObject.artists.filter((a) => a.artistId !== request.discardedArtistId);
      newArtistList.sort((a, b) => b.matchPercentage - a.matchPercentage);
      if (newArtistList.length <= 4) {
        const newRecommendation: ArtistRecommendation = this.simulatorRecommendations(fileDataObject, newArtistList, fileDataObject.discardedArtists);
        newRecommendation.artists.forEach((a) => newArtistList.push(a));
      }
      if (discardedArtistData) {
        const updatedRecommendation: ArtistRecommendation = {
          concertData: fileDataObject.concertData,
          artists: newArtistList,
          discardedArtists: fileDataObject.discardedArtists ? [...fileDataObject.discardedArtists, discardedArtistData] : [discardedArtistData],
          lastChangedUserId: request.userId,
          status: true,
        };
        fs.writeFileSync(
          `./database/${request.formId}`,
          JSON.stringify(updatedRecommendation),
        );
      } else {
        throw { message: `No Artist found for ID:${request.discardedArtistId}`, statusCode: 404 };
      }
      newArtistList.splice(10);
      return { success: true };
    }
    throw { message: `No file found for form ID: ${request.formId}`, statusCode: 404 };
  }

  // Deleting Concert Data files and return success state.
  // eslint-disable-next-line class-methods-use-this
  deleteConcertData(id: String): {formId: String, success: Boolean} {
    const fileExits = fs.existsSync(`./database/${id}`);
    if (fileExits === true) {
      // eslint-disable-next-line consistent-return
      fs.rm(`./database/${id}`, { recursive: true }, (err) => {
        if (err) {
          return { error: err.message, status: false };
        }
        return { formId: id, success: true };
      });
      return { formId: id, success: true };
    }
    throw { message: `File does not exits for FormId: ${id}`, statusCode: 404 };
  }
}
