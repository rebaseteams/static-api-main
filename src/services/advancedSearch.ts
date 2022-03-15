import { AdvancedSearchInterface } from '../models/interfaces/adancedSearch';
import { AdvancedSearchQuery, AdvancedSearchResults } from '../models/types/adancedSearch';

export default class AdvancedSearchService implements AdvancedSearchInterface {
  private advancedSearchRepo: AdvancedSearchInterface;

  constructor(
    advancedSearchRepo: AdvancedSearchInterface,
  ) {
    this.advancedSearchRepo = advancedSearchRepo;
  }

  async get(query: AdvancedSearchQuery): Promise<{results: AdvancedSearchResults}> {
    return this.advancedSearchRepo.get(query);
  }
}
