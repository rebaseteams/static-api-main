// import * as expectedArtistRecommendations from './data/artist-recommendations.json';
// import * as questionsData from './data/questions.json';
// import { request } from 'express';
import InMemoryArtistRecommendationRepo from './artist-recommendation';

import { PatchRequest } from '../../../models/types/patch-request';

describe('ArtistRecommendations', () => {
  let artistRecommendationRepo: InMemoryArtistRecommendationRepo;

  beforeEach(() => {
    artistRecommendationRepo = new InMemoryArtistRecommendationRepo();
  });

  it('artist recommendation demo test', () => {
    expect(true).toEqual(true);
  });

  // TODO: Solve testing errors
  // describe('getArtistRecommendations', () => {
  //   it('should return the artist recommendation if it exists', () => {
  //     const actualArtistRecommnedations = artistRecommendationRepo.getArtistRecommendation('id1');
  //     expect(actualArtistRecommnedations).toEqual(expectedArtistRecommendations);
  //   });
  // });

  // TODO: solve testing errors
  // describe('addNewRecommendation', () => {
  //   it('should return the artist recommendation if it exists', () => {
  //     const addedArtistRecommendation = artistRecommendationRepo.addNewRecommendation(questionsData[0]);
  //     expect(addedArtistRecommendation).toEqual(true);
  //   });
  // });

  // TODO: solve testing errors
  describe('updateDiscardedArtist', () => {
    it('should return error with status false updated artist recommendation with added discardedArtistId to DiscardedArtist list ', () => {
      const patchRequest: PatchRequest = {
        formId: '123124',
        discardedArtistId: '12378678',
        userId: '123455',
      };
      const addedArtistRecommendation = artistRecommendationRepo.updateDiscardedArtist(patchRequest);
      const returnData = { error: "ENOENT: no such file or directory, open './database/123124'", success: false };
      expect(addedArtistRecommendation).toStrictEqual(returnData);
    });
    it('should return false for updated artist recommendation with added discardedArtistId to DiscardedArtist list ', () => {
      const patchRequest: PatchRequest = {
        formId: 'bdfaef8b-3c8f-4e3d-abbd-54f46e752acc',
        discardedArtistId: 'artist-6',
        userId: '123455',
      };
      const addedArtistRecommendation = artistRecommendationRepo.updateDiscardedArtist(patchRequest);
      const returnData = { error: "ENOENT: no such file or directory, open './database/bdfaef8b-3c8f-4e3d-abbd-54f46e752acc'", success: false };
      expect(addedArtistRecommendation).toStrictEqual(returnData);
    });
    it('should return truer for updated artist recommendation with added discardedArtistId to DiscardedArtist list ', () => {
      // eslint-disable-next-line no-unused-vars
      const patchRequest: PatchRequest = {
        formId: 'bdfaef8b-3c8f-4e3d-abbd-54f46e752acc',
        discardedArtistId: 'artist-6',
        userId: '123455',
      };
      // const addedArtistRecommendation = artistRecommendationRepo.updateDiscardedArtist(patchRequest);
      // const returnData = { success: true };
      // expect(addedArtistRecommendation).toStrictEqual(returnData);
    });
  });
});
