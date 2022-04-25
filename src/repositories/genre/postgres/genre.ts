/* eslint-disable no-console */
import { Connection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Genre } from '../../../models/types/genre';
import { GenresInterface } from '../../../models/interfaces/genre';
import PgGenreEntity from '../../../models/entities/pg-genre';

export default class GenreRepo implements GenresInterface {
    private genreRepository : Repository<Genre>;

    constructor(connection: Connection) {
      this.genreRepository = connection.getRepository(PgGenreEntity);
    }

    async createGenre(name : string, description : string) : Promise<{genre : Genre}> {
      const genre: PgGenreEntity = {
        id: uuidv4(),
        bowie_genre_id: '',
        name,
        description,
      };
      await this.genreRepository.save(genre);
      return { genre };
    }

    async getGenre(id : string) : Promise<Genre> {
      const genre = await this.genreRepository.findOne({ id });
      if (genre) return genre;
      const err = { message: `Genre not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async deleteGenre(id : string) : Promise<{success : boolean}> {
      const resp = await this.genreRepository.delete({ id });
      if (resp.affected && resp.affected > 0) return { success: true };
      const err = { message: `Genre not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async editGenre(id : string, name : string, description : string) : Promise<{success : boolean}> {
      const genre = await this.genreRepository.findOne({ id });
      if (genre) {
        genre.name = name;
        genre.description = description;
        this.genreRepository.save(genre);
        return { success: true };
      }
      const err = { message: `Genre not found for id: ${id}`, statusCode: 404 };
      throw err;
    }

    async getGenres(skip : number, limit : number) : Promise<Genre[]> {
      const genres : Genre[] = await this.genreRepository.find({
        take: limit,
        skip,
      });
      return genres;
    }

    async getAllGenres() : Promise<Array<{id: string, name: string}>> {
      const genres : Array<{id: string, name: string}> = await this.genreRepository.find({
        select: ['id', 'name'],
      });
      return genres;
    }
}
