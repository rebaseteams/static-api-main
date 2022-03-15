/* eslint-disable no-return-await */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import _ from 'lodash';
import { Connection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PgArtistEntity } from '../../../models/entities/pg-artist';
import PgBrandEntity from '../../../models/entities/pg-brand';
import PgVenueEntity from '../../../models/entities/pg-venue';
import { AdvancedSearchInterface } from '../../../models/interfaces/adancedSearch';
import { AdvancedSearchQuery, AdvancedSearchResults } from '../../../models/types/adancedSearch';

export default class AdvacedSearchRepo implements AdvancedSearchInterface {
    private searchRepos: Array<{
      name: string;
      repo: Repository<any>
    }>;

    constructor(connection: Connection) {
      this.searchRepos = [
        {
          name: 'artist',
          repo: connection.getRepository(PgArtistEntity),
        },
        {
          name: 'brand',
          repo: connection.getRepository(PgBrandEntity),
        },
        {
          name: 'venue',
          repo: connection.getRepository(PgVenueEntity),
        },
      ];
    }

    async get(query: AdvancedSearchQuery): Promise<{ results: AdvancedSearchResults; }> {
      const repoResponseData: any = await Promise.all(

        this.searchRepos.map(async (e) => {
          const arr = await e.repo.find();
          return arr;
        }),
      );

      const searchData: AdvancedSearchResults = _.flatten(repoResponseData);
      return { results: searchData };
    }
}
