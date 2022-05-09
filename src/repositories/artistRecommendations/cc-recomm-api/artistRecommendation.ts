/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { v4 as uuidv4 } from 'uuid';
import { Connection, Repository } from 'typeorm';
import { ArtistRecommendation, RecommendtionValidation } from '../../../models/types/artist-recommendation';
import { ConcertCreationResponse, QuestionsUI } from '../../../models/types/questions';
import { Artist } from '../../../models/types/artist';
import { ArtistRecommendationInterface } from '../../../models/interfaces/artist-recommendation';
import PgArtistRecommendationEntity from '../../../models/entities/pg-artist-recommendation';
import PgEventsTypeEntity from '../../../models/entities/pg-events-type';
import PgVenueEntity from '../../../models/entities/pg-venue';
import PgBrandEntity from '../../../models/entities/pg-brand';
import { PgUserEntity } from '../../../models/entities/pg-user';
import { CCRecommendationInterface } from '../../../models/interfaces/ccRecommendation';
import CCRecommendationRepo from '../../ccRecommendation/postgres';

export default class ArtistRecommendationRepo implements ArtistRecommendationInterface {
  private artistRecommendationRepository : Repository<PgArtistRecommendationEntity>;

  private eventsTypeRepository: Repository<PgEventsTypeEntity>

  private venueRepository: Repository<PgVenueEntity>

  private brandsRepository: Repository<PgBrandEntity>

  private userRepository : Repository<PgUserEntity>;

  private ccRecommendation : CCRecommendationInterface;

  constructor(connection: Connection) {
    this.artistRecommendationRepository = connection.getRepository(PgArtistRecommendationEntity);
    this.eventsTypeRepository = connection.getRepository(PgEventsTypeEntity);
    this.venueRepository = connection.getRepository(PgVenueEntity);
    this.brandsRepository = connection.getRepository(PgBrandEntity);
    this.userRepository = connection.getRepository(PgUserEntity);
    this.ccRecommendation = new CCRecommendationRepo(process.env.CC_RECOMM_SERVER);
  }

  // eslint-disable-next-line no-unused-vars
  async validateRecommendationFields(fields: RecommendtionValidation, user_id: string): Promise<{ nameAvailable: boolean; }> {
    const { eventName } = fields;
    if (!eventName) return { nameAvailable: false };
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

  async getRecommendationStatus(id : string) : Promise<{status : boolean}> {
    const recommendation = await this.artistRecommendationRepository.findOne(id);
    if (recommendation) {
      return { status: recommendation.status };
    }
    const err = { message: `Recommendation not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getRecommendation(id : string) : Promise<ArtistRecommendation> {
    const recommendation = await this.artistRecommendationRepository.findOne(
      id,
      { relations: ['event_type', 'venue', 'wanted_brands', 'unwanted_brands'] },
    );
    const userName = await this.userRepository.findOne(recommendation.user_id);
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
        lastChangedUserId: userName.name,
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

  // eslint-disable-next-line no-unused-vars
  async generateRecommendedArtists(id : string, _artists : Artist[]) : Promise<{ success: boolean }> {
    try {
      const artistRecommendation = await this.artistRecommendationRepository.findOne(id);

      if (artistRecommendation) {
        await this.ccRecommendation.generateRecommendation(id);
        return { success: true };
      }
    } catch (error) {
      const err = { message: `Recommendation not generated for id: ${id}`, statusCode: 404 };
      throw err;
    }
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
