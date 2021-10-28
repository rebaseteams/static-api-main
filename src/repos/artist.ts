import { Artist } from '../model/artist';
import * as dummaryArtists from './dummy-artist-data.json';

function getArtists(): Artist[] {
  return dummaryArtists;
}

export default getArtists;
