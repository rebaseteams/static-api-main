import { Connection } from 'typeorm';
import { PgArtistEntity } from '../models/entities/pg-artist';
import PgBrandEntity from '../models/entities/pg-brand';
import PgVenueEntity from '../models/entities/pg-venue';

const getDesiredSearchRepos = (connection: Connection) => [{
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

export default getDesiredSearchRepos;
