/* eslint-disable class-methods-use-this */
import { Connection, Repository } from 'typeorm';
import { Artist as TypeArtist } from '../../../models/types/artist';
import { ArtistInterface } from '../../../models/interfaces/artist';
import { PgArtistEntity } from '../../../models/entities/pg-artist';

export default class ArtistsRepo implements ArtistInterface {
  private artistRepository : Repository<PgArtistEntity>;

  constructor(connection: Connection) {
    this.artistRepository = connection.getRepository(PgArtistEntity);
  }

  async getArtist(id : string) : Promise<TypeArtist> {
    const artist = await this.artistRepository.findOne({ id });
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
    const toSendArtists : TypeArtist[] = artists.map((artist) => {
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
      };
      return toSendArtist;
    });
    return toSendArtists;
  }
}
