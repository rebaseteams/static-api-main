/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';
import { createConnection, Repository } from 'typeorm';
import ArtistRecommendation from '../../../models/entities/ArtistRecommendation';
import { ArtistRecommendation as ARecommendation } from '../../../models/types/artist-recommendation';
import { ConcertCreationResponse, QuestionsUI } from '../../../models/types/questions';
import { Artist } from '../../../models/types/artist';
import { ArtistRecommendationInterface } from '../../../models/interfaces/artist-recommendation';

export default class ArtistRecommendationRepo implements ArtistRecommendationInterface {
  private artistRecommendationRepository : Repository<ArtistRecommendation>;

  private lambda : AWS.Lambda;

  constructor() {
    createConnection().then((connection) => {
      this.artistRecommendationRepository = connection.getRepository(ArtistRecommendation);
    });
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION,
    });
    this.lambda = new AWS.Lambda();
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
    const recommendation = new ArtistRecommendation(
      uuidv4(),
      questions.concertName,
      new Date(),
      questions.userId,
      questions.eventType,
      questions.venue,
      questions.artistBudget,
      questions.sponsorshipType,
      questions.wantedBrands,
      questions.unwantedBrands,
      questions.targetAudience,
      questions.whatSellsMost,
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

    const Payload = JSON.stringify({ artistRecommendation, _artists });

    const params = {
      FunctionName: 'recommendation', /* required */
      Payload,
    };
    if (artistRecommendation) {
      try {
        const response = await this.lambda.invoke(params).promise();
        const data = JSON.parse(JSON.stringify(response));
        console.log(data);
        await this.artistRecommendationRepository.save(JSON.parse(data.Payload.recommendation));
        return { success: true };
      } catch (error) {
        console.log('Error catched', error);
        return { success: false };
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
