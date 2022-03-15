/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { Connection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AdvancedSearchInterface } from '../../../models/interfaces/adancedSearch';
import { AdvancedSearchQuery, AdvancedSearchResults } from '../../../models/types/adancedSearch';

export default class AdvacedSearchRepo implements AdvancedSearchInterface {
    private Conn: Connection
    // will make use of this connection to find repo

    constructor(connection: Connection) {
      this.Conn = connection;
    }

    async get(query: AdvancedSearchQuery): Promise<{ results: AdvancedSearchResults; }> {
      const dummyData = [{
        id: uuidv4(),
        image: 'string',
        title: 'string',
        description: 'string',
        type: 'string',
        destinationUrl: 'string',
      }];
      return { results: dummyData };
    }
}
