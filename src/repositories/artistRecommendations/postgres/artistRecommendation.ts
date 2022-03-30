/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { v4 as uuidv4 } from 'uuid';
import { Connection, Repository } from 'typeorm';
import { ArtistRecommendation, ARec, RecommendtionValidation } from '../../../models/types/artist-recommendation';
import { ConcertCreationResponse, QuestionsUI } from '../../../models/types/questions';
import { Artist } from '../../../models/types/artist';
import { ArtistRecommendationInterface } from '../../../models/interfaces/artist-recommendation';
import PgArtistRecommendationEntity from '../../../models/entities/pg-artist-recommendation';
import PgEventsTypeEntity from '../../../models/entities/pg-events-type';
import PgVenueEntity from '../../../models/entities/pg-venue';
import PgBrandEntity from '../../../models/entities/pg-brand';

export default class ArtistRecommendationRepo implements ArtistRecommendationInterface {
  private artistRecommendationRepository : Repository<PgArtistRecommendationEntity>;

  private eventsTypeRepository: Repository<PgEventsTypeEntity>

  private venueRepository: Repository<PgVenueEntity>

  private brandsRepository: Repository<PgBrandEntity>

  constructor(connection: Connection) {
    this.artistRecommendationRepository = connection.getRepository(PgArtistRecommendationEntity);
    this.eventsTypeRepository = connection.getRepository(PgEventsTypeEntity);
    this.venueRepository = connection.getRepository(PgVenueEntity);
    this.brandsRepository = connection.getRepository(PgBrandEntity);
  }

  async getRecommendationStatus(id : string) : Promise<{status : boolean}> {
    const recommendation = await this.artistRecommendationRepository.findOne(id);
    if (recommendation) {
      return { status: recommendation.status };
    }
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getRecommendation(id : string) : Promise<ArtistRecommendation> {
    const recommendation = await this.artistRecommendationRepository.findOne(id);
    if (recommendation) {
      const aRecommendation : ArtistRecommendation = {
        concertData: {
          id: recommendation.id,
          userId: recommendation.user_id,
          concertName: recommendation.name,
          eventType: recommendation.event_type,
          venue: recommendation.venue,
          artistBudget: recommendation.artist_budget,
          sponsorshipType: recommendation.sponsorship_type,
          wantedBrands: recommendation.wanted_brands,
          unwantedBrands: recommendation.unwanted_brands,
          targetAudience: recommendation.target_audience,
          whatSellsMost: recommendation.what_sells_most,
          dateCreated: recommendation.date_created.toDateString(),
        },
        artists: recommendation.artists,
        discardedArtists: recommendation.discarded_artists,
        documents: recommendation.documents,
        lastChangedUserId: recommendation.user_id,
        status: recommendation.status,
      };
      return aRecommendation;
    }
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getAllRecommendations(user_id: string) : Promise<ConcertCreationResponse[]> {
    let allRecommendations : PgArtistRecommendationEntity[] = [];
    allRecommendations = await this.artistRecommendationRepository.find({ user_id });
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

  async validateRecommendationFields(fields: RecommendtionValidation, user_id: string) : Promise<{nameAvailable: boolean}> {
    const { eventName } = fields;
    const resp = await this.artistRecommendationRepository.find({
      select: ['name'],
      where: {
        name: eventName,
        user_id,
      },
    });
    if (resp.length === 0) return { nameAvailable: true };
    return { nameAvailable: false };
  }

  async discardArtist(id : string, artistId : string) : Promise<{ success: boolean }> {
    const artistRecommendation = await this.artistRecommendationRepository.findOne(id);
    if (artistRecommendation) {
      let artistsArray = artistRecommendation.artists;
      const discardedArtistArray = artistRecommendation.discarded_artists;
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
      artistRecommendation.discarded_artists = discardedArtistArray;
      artistRecommendation.artists = artistsArray;
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
    const events_type = await this.eventsTypeRepository.findOne(questions.eventType);
    const venues = await this.venueRepository.findByIds(questions.venue);
    const wantedBrands = await this.brandsRepository.findByIds(questions.wantedBrands);
    const unwantedBrands = await this.brandsRepository.findByIds(questions.unwantedBrands);
    const recommendation: PgArtistRecommendationEntity = {
      id: uuidv4(),
      name: questions.concertName,
      date_created: new Date(),
      user_id: questions.userId,
      event_type_id: questions.eventType,
      event_type: events_type,
      venue_id: questions.venue,
      venue: venues,
      artist_budget: questions.artistBudget,
      sponsorship_type: questions.sponsorshipType,
      wanted_brands_id: questions.wantedBrands,
      wanted_brands: wantedBrands,
      unwanted_brands_id: questions.unwantedBrands,
      unwanted_brands: unwantedBrands,
      target_audience: questions.targetAudience,
      what_sells_most: questions.whatSellsMost,
      artists: [],
      discarded_artists: [],
      documents: [],
      status: false,
    };

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
      let { artists } = artistRecommendation;
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
      artistRecommendation.artists = artists;
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
      const artistsCount = artistRecommendation.artists.length;
      const discardedArtistsCount = artistRecommendation.discarded_artists.length;
      return { count: discardedArtistsCount + artistsCount };
    }
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async registerDocument(id : string, docid : string) : Promise<{success : boolean}> {
    const artistRecommendation = await this.artistRecommendationRepository.findOne(id);
    if (artistRecommendation) {
      artistRecommendation.documents.push(docid);
      this.artistRecommendationRepository.save(artistRecommendation);
      return { success: true };
    }
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }
}
