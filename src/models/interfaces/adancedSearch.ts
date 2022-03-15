/* eslint-disable no-unused-vars */
import { AdvancedSearchQuery, AdvancedSearchResults } from '../types/adancedSearch';

export interface AdvancedSearchInterface {
      get(query: AdvancedSearchQuery): Promise<{results: AdvancedSearchResults}>,
}
