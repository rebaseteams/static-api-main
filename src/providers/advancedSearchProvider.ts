import _ from 'lodash';
import { AdvancedSearchInterface } from '../models/interfaces/adancedSearch';
import { AdvancedSearchDesiredRepos, AdvancedSearchQuery, AdvancedSearchResults } from '../models/types/adancedSearch';

export default class AdvancedSearchProvider implements AdvancedSearchInterface {
private desiredRepos: AdvancedSearchDesiredRepos;

constructor(desiredRepos: AdvancedSearchDesiredRepos) {
  this.desiredRepos = desiredRepos;
}

async get(query: AdvancedSearchQuery): Promise<{ results: AdvancedSearchResults; }> {
  let filteredRepos: AdvancedSearchDesiredRepos;
  if (query.category) {
    const validCategory = !!this.desiredRepos.find((i) => i.name === query.category);
    if (validCategory) {
      filteredRepos = this.desiredRepos.filter((r) => r.name === query.category);
    } else {
      filteredRepos = this.desiredRepos;
    }
  } else {
    filteredRepos = this.desiredRepos;
  }
  const repoResponseData: any = await Promise.all(

    filteredRepos.map(async (e) => {
      const arr = await e.repo.find();
      return arr;
    }),
  );

  const searchData: AdvancedSearchResults = _.flatten(repoResponseData);
  return { results: searchData };
}
}
