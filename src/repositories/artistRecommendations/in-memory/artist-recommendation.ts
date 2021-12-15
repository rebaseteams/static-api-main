/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { ArtistRecommendationInterface } from '../../../models/interfaces/artist-recommendation';
import { ARec, ArtistRecommendation } from '../../../models/types/artist-recommendation';
import { ConcertCreationResponse, QuestionsUI } from '../../../models/types/questions';
import fileCheck from '../../../utils/fileCheck';
import { Artist } from '../../../models/types/artist';

export default class InMemoryArtistRecommendationRepo implements ArtistRecommendationInterface {
  async getRecommendationStatus(id : string) : Promise<{status : boolean}> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const readData = fs.readFileSync(`${__dirname}/data/${id}.json`).toString();
      const data = JSON.parse(readData) as ArtistRecommendation;
      return { status: data.status };
    }
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getRecommendation(id : string) : Promise<ArtistRecommendation> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const readData = fs.readFileSync(`${__dirname}/data/${id}.json`).toString();
      const data = JSON.parse(readData) as ArtistRecommendation;
      return data;
    }
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getAllRecommendations() : Promise<ConcertCreationResponse[]> {
    fileCheck(`${__dirname}/data`, false);
    const allRecommendations : ConcertCreationResponse[] = [];
    fs.readdirSync(`${__dirname}/data`).forEach((file) => {
      const toread = fs.readFileSync(`${__dirname}/data/${file}`).toString();
      const dataJson = JSON.parse(toread) as ArtistRecommendation;
      const recommendation : ConcertCreationResponse = {
        id: dataJson.concertData.id,
        concertName: dataJson.concertData.concertName,
        status: dataJson.status,
        dateCreated: dataJson.concertData.dateCreated,
      };
      allRecommendations.push(recommendation);
    });
    return allRecommendations;
  }

  async discardArtist(id : string, artistId : string) : Promise<{ success: boolean }> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const readData = fs.readFileSync(`${__dirname}/data/${id}.json`).toString();
      const data = JSON.parse(readData) as ArtistRecommendation;
      let artistsArray = data.artists;
      const discardedArtistArray = data.discardedArtists;
      let found = false;
      artistsArray = artistsArray.filter((artist) => {
        if (artist.artistId !== artistId) {
          return artist;
        }
        found = true;
        discardedArtistArray.push(artist);
      });
      if (!found) {
        const err = { message: `Artist not found for id: ${artistId}`, statusCode: 404 };
        throw err;
      }
      data.artists = artistsArray;
      data.discardedArtists = discardedArtistArray;
      fs.writeFileSync(`${__dirname}/data/${id}.json`, JSON.stringify(data));
      return { success: true };
    }
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async deleteRecommendation(id : string) : Promise<{ success: boolean }> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      fs.unlinkSync(`${__dirname}/data/${id}.json`);
      return { success: true };
    }
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async createRecommendation(questions: QuestionsUI) : Promise<ConcertCreationResponse> {
    const recommendation : ArtistRecommendation = {
      concertData: {
        id: uuidv4(),
        concertName: questions.concertName,
        dateCreated: new Date().toDateString(),
        userId: questions.userId,
        eventType: questions.eventType,
        venue: questions.venue,
        artistBudget: questions.artistBudget,
        sponsorshipType: questions.sponsorshipType,
        wantedBrands: questions.wantedBrands,
        unwantedBrands: questions.unwantedBrands,
        targetAudience: questions.targetAudience,
        whatSellsMost: questions.whatSellsMost,
      },
      artists: [],
      discardedArtists: [],
      documents: [],
      lastChangedUserId: questions.userId,
      status: false,
    };
    fileCheck(`${__dirname}/data`, false);
    fs.writeFileSync(`${__dirname}/data/${recommendation.concertData.id}.json`, JSON.stringify(recommendation));
    const data : ConcertCreationResponse = {
      id: recommendation.concertData.id,
      concertName: recommendation.concertData.concertName,
      status: recommendation.status,
      dateCreated: recommendation.concertData.dateCreated,
    };
    return data;
  }

  async generateRecommendedArtists(id : string, _artists : Artist[]) : Promise<{success : boolean}> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const readData = fs.readFileSync(`${__dirname}/data/${id}.json`).toString();
      const data = JSON.parse(readData) as ArtistRecommendation;
      let { artists } = data;
      const recommendedArtists : ARec[] = [];
      _artists.forEach((element) => {
        const artistRec : ARec = {
          artistName: element.name,
          artistId: element.id,
          artistImage: element.image,
          artistGender: element.gender,
          matchPercentage: Math.floor(Math.random() * 99),
          matchAttributes: {
            venues: [
              {
                id: '1234',
                name: 'Los Angeles',
                address: {
                  pincode: 1234,
                  country: 'USA',
                  city: 'Los Angeles',
                  geoLocation: {
                    lat: 132.121,
                    long: 2423.234,
                  },
                },
                venueCapacity: Math.floor(Math.random() * 600),
                matchPercentage: Math.floor(Math.random() * 99),
              }],
            age: {
              ageGroup: '18 - 25',
              matchPercentage: Math.floor(Math.random() * 99),
            },
            gender: {
              male: Math.floor(Math.random() * 50),
              female: Math.floor(Math.random() * 50),
            },
            genre: [
              {
                genreName: 'Rock',
                matchPercentage: Math.floor(Math.random() * 30),
              },
              {
                genreName: 'Jazz',
                matchPercentage: Math.floor(Math.random() * 30),
              },
              {
                genreName: 'Pop',
                matchPercentage: Math.floor(Math.random() * 30),
              },
            ],
            associatedBrands: [
              {
                id: '1234',
                name: 'Coca Cola',
                contact: '919292929292',
                website: 'https://www.coca-cola.com/',
                logoUrl: 'https://1000logos.net/wp-content/uploads/2016/11/Shape-Coca-Cola-Logo.jpg',
              },
              {
                id: '1235',
                name: 'Youtube',
                contact: '919292929292',
                website: 'https://www.youtube.com/',
                logoUrl: 'https://w7.pngwing.com/pngs/936/468/png-transparent-youtube-logo-youtube-logo-computer-icons-subscribe-angle-rectangle-airplane.png',
              },
              {
                id: '1236',
                name: 'Facebook',
                contact: '919292929292',
                website: 'https://www.facebook.com/',
                logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1200px-2021_Facebook_icon.svg.png',
              },
            ],
          },
          summary: element.bio,
        };
        recommendedArtists.push(artistRec);
      });
      artists = artists.concat(recommendedArtists).slice(0, 10);
      data.artists = artists;
      data.status = true;
      fs.writeFileSync(`${__dirname}/data/${id}.json`, JSON.stringify(data));
      return { success: true };
    }
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getArtistCount(id : string) : Promise<{count : number }> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const readData = fs.readFileSync(`${__dirname}/data/${id}.json`).toString();
      const data = JSON.parse(readData) as ArtistRecommendation;
      const artistsCount = data.artists.length;
      const discardedArtistsCount = data.discardedArtists.length;
      return { count: artistsCount + discardedArtistsCount };
    }
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async registerDocument(id : string, docid : string) : Promise<{success : boolean}> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const readData = fs.readFileSync(`${__dirname}/data/${id}.json`).toString();
      const data = JSON.parse(readData) as ArtistRecommendation;
      data.documents.push(docid);
      fs.writeFileSync(`${__dirname}/data/${id}.json`, JSON.stringify(data));
      return { success: true };
    }
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }
}
