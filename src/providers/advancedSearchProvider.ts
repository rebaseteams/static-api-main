import _ from 'lodash';
import { ILike } from 'typeorm';
import { AdvancedSearchInterface } from '../models/interfaces/adancedSearch';
import { AdvancedSearchDesiredRepos, AdvancedSearchQuery, AdvancedSearchResults } from '../models/types/adancedSearch';

export default class AdvancedSearchProvider implements AdvancedSearchInterface {
    private desiredRepos: AdvancedSearchDesiredRepos;

    private filterDesiredRepos(category: string) {
      if (!category) return this.desiredRepos;
      const validCategory = !!this.desiredRepos.find((i) => i.name === category);
      if (!validCategory) return this.desiredRepos;
      return this.desiredRepos.filter((r) => r.name === category);
    }

    constructor(desiredRepos: AdvancedSearchDesiredRepos) {
      this.desiredRepos = desiredRepos;
    }

    async get(query: AdvancedSearchQuery): Promise<{ results: AdvancedSearchResults; }> {
      const filteredRepos = this.filterDesiredRepos(query.category);

      const repoResponseData: any = await Promise.all(
        filteredRepos.map(async (e) => {
          const arr = await e.repo.find({
            select: e.options.select,
            where: e.options.searchFrom.map((i) => {
              const obj = {};
              obj[i] = ILike(`%${query.query}%`);
              return obj;
            }),
          });
          return arr;
        }),
      );

      const searchData: AdvancedSearchResults = _.flatten(repoResponseData);
      return { results: searchData };
    }
}
