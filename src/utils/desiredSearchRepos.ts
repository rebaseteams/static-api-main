import { Connection } from 'typeorm';
import { PgArtistEntity } from '../models/entities/pg-artist';
import PgBrandEntity from '../models/entities/pg-brand';
import PgVenueEntity from '../models/entities/pg-venue';

const getDesiredSearchRepos = (connection: Connection) => [{
  name: 'artist',
  repo: connection.getRepository(PgArtistEntity),
  options: {
    select: ['id', 'name', 'country'],
    searchFrom: ['name', 'country'],
  },
},
{
  name: 'brand',
  repo: connection.getRepository(PgBrandEntity),
  options: {
    select: ['id', 'name'],
    searchFrom: ['name'],

  },
},
{
  name: 'venue',
  repo: connection.getRepository(PgVenueEntity),
  options: {
    select: ['id', 'name'],
    searchFrom: ['name'],

  },
},
];

export default getDesiredSearchRepos;
