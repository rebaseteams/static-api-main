import { Connection } from 'typeorm';
import { PgArtistEntity } from '../models/entities/pg-artist';
import PgBrandEntity from '../models/entities/pg-brand';
import PgVenueEntity from '../models/entities/pg-venue';

const getDesiredSearchRepos = (connection: Connection) => [{
  name: 'artist',
  repo: connection.getRepository(PgArtistEntity),
  options: {
    select: ['id', 'name'],
    searchFrom: ['name'],
  },
  mapperFunction: (res: any) => (res.map((r) => ({
    id: r.id,
    title: r.name,
    description: 'artist description',
    image: '',
    type: 'artist',
    destinationUrl: '',
  }))),
},
{
  name: 'brand',
  repo: connection.getRepository(PgBrandEntity),
  options: {
    select: ['id', 'name'],
    searchFrom: ['name'],
  },
  mapperFunction: (res: any) => (res.map((r) => ({
    id: r.id,
    title: r.name,
    description: 'brand description',
    image: '',
    type: 'brand',
    destinationUrl: '',
  }))),
},
{
  name: 'venue location',
  repo: connection.getRepository(PgVenueEntity),
  options: {
    select: ['id', 'name'],
    searchFrom: ['name'],
  },
  mapperFunction: (res: any) => (res.map((r) => ({
    id: r.id,
    title: r.name,
    description: 'some description of venue location',
    image: '',
    type: 'venue',
    destinationUrl: '',
  }))),
},
];

export default getDesiredSearchRepos;
