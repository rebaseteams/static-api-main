/* eslint-disable class-methods-use-this */
import { Connection, Repository } from 'typeorm';
import { Artist as TypeArtist } from '../../../models/types/artist';
import { ArtistInterface } from '../../../models/interfaces/artist';
import { PgArtistEntity } from '../../../models/entities/pg-artist';
import brandAffinity from './addOnData/brandAffinity';
import popularityOverTime from './addOnData/popularityOverTime';
import latestReleaseVideos from './addOnData/latestReleaseVideos';
import { youtubeinsights } from './addOnData/youtubeInsights';
import { FileManagerInterface } from '../../../models/interfaces/file-manager';

export default class ArtistsRepo implements ArtistInterface {
  private artistRepository : Repository<PgArtistEntity>;

  private artistsProfileFileManagerRepo: FileManagerInterface

  constructor(connection: Connection, artistsProfileFileManagerRepo: FileManagerInterface) {
    this.artistRepository = connection.getRepository(PgArtistEntity);
    this.artistsProfileFileManagerRepo = artistsProfileFileManagerRepo;
  }

  async getArtist(id : string) : Promise<TypeArtist> {
    const artist = await this.artistRepository.findOne({ id });
    const resp = await this.artistsProfileFileManagerRepo.get(`${id}.json`);
    const misc = resp.success ? JSON.parse(resp.data.toString()) : null;
    if (artist) {
      const toSendArtist : TypeArtist = {
        id: artist.id,
        name: artist.name,
        gender: artist.gender,
        associated_brands: artist.associated_brands,
        venues: artist.venues,
        country: artist.country,
        image: artist.image,
        cover_image: artist.cover_image,
        bio: artist.bio,
        manager: artist.manager,
        contact: artist.contact,
        address: artist.address,
        popularity: artist.popularity,
        audience: artist.audience,
        media_handles: artist.media_handles,
        brand_affinity: brandAffinity,
        popularity_over_time: popularityOverTime,
        latest_youtube_release: latestReleaseVideos,
        youtube_insights: youtubeinsights,
        misc,
      };
      return toSendArtist;
    }
    const err = { message: `Artist not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getArtists(skip: number, limit : number) : Promise<TypeArtist[]> {
    const artists : PgArtistEntity [] = await this.artistRepository.find({
      order: {
        popularity: 'ASC',
      },
      take: limit,
      skip,
    });
    const toSendArtists : Promise<TypeArtist>[] = artists.map(async (artist) => {
      const resp = await this.artistsProfileFileManagerRepo.get(`${artist.id}.json`);
      const misc = resp.success ? JSON.parse(resp.data.toString()) : null;
      const toSendArtist : TypeArtist = {
        id: artist.id,
        name: artist.name,
        gender: artist.gender,
        associated_brands: artist.associated_brands,
        venues: artist.venues,
        country: artist.country,
        image: artist.image,
        cover_image: artist.cover_image,
        bio: artist.bio,
        manager: artist.manager,
        contact: artist.contact,
        address: artist.address,
        popularity: artist.popularity,
        audience: artist.audience,
        media_handles: artist.media_handles,
        brand_affinity: brandAffinity,
        popularity_over_time: popularityOverTime,
        latest_youtube_release: latestReleaseVideos,
        youtube_insights: youtubeinsights,
        misc: misc || null,

      };
      return toSendArtist;
    });
    return Promise.all(toSendArtists);
  }
}
