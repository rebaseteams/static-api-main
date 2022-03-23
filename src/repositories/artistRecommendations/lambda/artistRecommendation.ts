/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';
import { Connection, Repository } from 'typeorm';
import { ArtistRecommendation, RecommendtionValidation } from '../../../models/types/artist-recommendation';
import { ConcertCreationResponse, QuestionsUI } from '../../../models/types/questions';
import { Artist } from '../../../models/types/artist';
import { ArtistRecommendationInterface } from '../../../models/interfaces/artist-recommendation';
import PgArtistRecommendationEntity from '../../../models/entities/pg-artist-recommendation';

export default class ArtistRecommendationRepo implements ArtistRecommendationInterface {
  private artistRecommendationRepository : Repository<PgArtistRecommendationEntity>;

  private lambda : AWS.Lambda;

  constructor(connection: Connection) {
    this.artistRecommendationRepository = connection.getRepository(PgArtistRecommendationEntity);
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION_US,
    });
    this.lambda = new AWS.Lambda();
  }

  // eslint-disable-next-line no-unused-vars
  async validateRecommendationFields(fields: RecommendtionValidation): Promise<{ nameAvailable: boolean; }> {
    const { eventName } = fields;
    if (!eventName) return { nameAvailable: false };
    const resp = await this.artistRecommendationRepository.find({
      select: ['name'],
      where: {
        name: eventName,
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

  async getAllRecommendations() : Promise<ConcertCreationResponse[]> {
    let allRecommendations : PgArtistRecommendationEntity[] = [];
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
    const recommendation: PgArtistRecommendationEntity = {
      id: uuidv4(),
      name: questions.concertName,
      date_created: new Date(),
      user_id: questions.userId,
      event_type: questions.eventType,
      venue: questions.venue,
      artist_budget: questions.artistBudget,
      sponsorship_type: questions.sponsorshipType,
      wanted_brands: questions.wantedBrands,
      unwanted_brands: questions.unwantedBrands,
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

    const Payload = JSON.stringify({ id, _artists });

    const params = {
      FunctionName: 'recommendation', /* required */
      Payload,
    };
    if (artistRecommendation) {
      try {
        await this.lambda.invoke(params).promise();
        return { success: true };
      } catch (error) {
        throw JSON.parse(error);
      }
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
