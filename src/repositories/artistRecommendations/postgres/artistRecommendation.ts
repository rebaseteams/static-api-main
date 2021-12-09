/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { v4 as uuidv4 } from 'uuid';
import { createConnection, Repository } from 'typeorm';
import ArtistRecommendation from '../../../models/entities/ArtistRecommendation';
import { ArtistRecommendation as ARecommendation, ARec } from '../../../models/types/artist-recommendation';
import { ConcertCreationResponse, QuestionsUI } from '../../../models/types/questions';
import { Artist } from '../../../models/types/artist';
import { ArtistRecommendationInterface } from '../../../models/interfaces/artist-recommendation';

export default class ArtistRecommendationRepo implements ArtistRecommendationInterface {
  private artistRecommendationRepository : Repository<ArtistRecommendation>;

  constructor() {
    createConnection().then((connection) => {
      this.artistRecommendationRepository = connection.getRepository(ArtistRecommendation);
    });
  }

  async getRecommendationStatus(id : string) : Promise<{status : boolean}> {
    const recommendation = await this.artistRecommendationRepository.findOne(id);
    if (recommendation) {
      return { status: recommendation.status };
    }
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getRecommendation(id : string) : Promise<ARecommendation> {
    const recommendation = await this.artistRecommendationRepository.findOne(id);
    if (recommendation) {
      const aRecommendation : ARecommendation = {
        concertData: {
          id: recommendation.id,
          userId: recommendation.user_id,
          concertName: recommendation.name,
          eventType: recommendation.event_type,
          venue: JSON.parse(recommendation.venue),
          artistBudget: JSON.parse(recommendation.artist_budget),
          sponsorshipType: recommendation.sponsorship_type,
          wantedBrands: JSON.parse(recommendation.wanted_brands),
          unwantedBrands: JSON.parse(recommendation.unwanted_brands),
          targetAudience: JSON.parse(recommendation.target_audience),
          whatSellsMost: JSON.parse(recommendation.target_audience),
          dateCreated: recommendation.date_created.toDateString(),
        },
        artists: JSON.parse(recommendation.artists),
        discardedArtists: JSON.parse(recommendation.discarded_artists),
        lastChangedUserId: recommendation.user_id,
        status: recommendation.status,
      };
      return aRecommendation;
    }
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getAllRecommendations() : Promise<ConcertCreationResponse[]> {
    let allRecommendations : ArtistRecommendation[] = [];
    allRecommendations = await this.artistRecommendationRepository.find();
    const allARecommendations : ConcertCreationResponse[] = allRecommendations.map((recommendation) => {
      const aRecommendation : ConcertCreationResponse = {
        id: recommendation.id,
        concertName: recommendation.name,
        status: recommendation.status,
        dateCreated: recommendation.date_created.toDateString(),
      };
      return aRecommendation;
    });
    return allARecommendations;
  }

  async discardArtist(id : string, artistId : string) : Promise<{ success: boolean }> {
    const artistRecommendation = await this.artistRecommendationRepository.findOne(id);
    if (artistRecommendation) {
      let artistsArray = JSON.parse(artistRecommendation.artists) as ARec[];
      const discardedArtistArray = JSON.parse(artistRecommendation.discarded_artists) as ARec[];
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
      artistRecommendation.discarded_artists = JSON.stringify(discardedArtistArray);
      artistRecommendation.artists = JSON.stringify(artistsArray);
      this.artistRecommendationRepository.save(artistRecommendation);
      return { success: true };
    }
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async deleteRecommendation(id : string) : Promise<{ success: boolean }> {
    const resp = await this.artistRecommendationRepository.delete({ id });
    if (resp.affected && resp.affected > 0) return { success: true };
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async createRecommendation(questions: QuestionsUI) : Promise<ConcertCreationResponse> {
    const recommendation = new ArtistRecommendation(
      uuidv4(),
      questions.concertName,
      new Date(),
      questions.userId,
      questions.eventType,
      JSON.stringify(questions.venue),
      JSON.stringify(questions.artistBudget),
      questions.sponsorshipType,
      JSON.stringify(questions.wantedBrands),
      JSON.stringify(questions.unwantedBrands),
      JSON.stringify(questions.targetAudience),
      JSON.stringify(questions.whatSellsMost),
    );
    await this.artistRecommendationRepository.save(recommendation);
    const data : ConcertCreationResponse = {
      id: recommendation.id,
      concertName: recommendation.name,
      status: recommendation.status,
      dateCreated: recommendation.date_created.toDateString(),
    };
    return data;
  }

  async generateRecommendedArtists(id : string, _artists : Artist[]) : Promise<{ success: boolean }> {
    const artistRecommendation = await this.artistRecommendationRepository.findOne(id);
    if (artistRecommendation) {
      let artists : ARec[] = JSON.parse(artistRecommendation.artists);
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
      artistRecommendation.artists = JSON.stringify(artists);
      artistRecommendation.status = true;
      this.artistRecommendationRepository.save(artistRecommendation);
      return { success: true };
    }
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getArtistCount(id : string) : Promise<{count : number }> {
    const artistRecommendation = await this.artistRecommendationRepository.findOne(id);
    if (artistRecommendation) {
      const artistsCount = JSON.parse(artistRecommendation.artists).length;
      const discardedArtistsCount = JSON.parse(artistRecommendation.discarded_artists).length;
      return { count: discardedArtistsCount + artistsCount };
    }
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }
}
