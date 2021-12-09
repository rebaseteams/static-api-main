/* eslint-disable class-methods-use-this */
import { createConnection, Repository } from 'typeorm';
import { Artist as TypeArtist, audience, media_handles } from '../../../models/types/artist';
import { ArtistInterface } from '../../../models/interfaces/artist';
import Artist from '../../../models/entities/Artist';

export default class ArtistsRepo implements ArtistInterface {
  private artistRepository : Repository<Artist>;

  constructor() {
    createConnection().then((connection) => {
      this.artistRepository = connection.getRepository(Artist);
    });
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
        audience: JSON.parse(artist.audience) as audience,
        media_handles: JSON.parse(artist.media_handles) as media_handles,
      };
      return toSendArtist;
    }
    const err = { message: `Artist not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getArtists(skip: number, limit : number) : Promise<TypeArtist[]> {
    const artists : Artist [] = await this.artistRepository.find({
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
        audience: JSON.parse(artist.audience) as audience,
        media_handles: JSON.parse(artist.media_handles) as media_handles,
      };
      return toSendArtist;
    });
    return toSendArtists;
  }
}
