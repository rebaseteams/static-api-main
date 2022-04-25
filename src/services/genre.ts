import { Genre } from '../models/types/genre';
import { GenresInterface } from '../models/interfaces/genre';

export default class GenresService implements GenresInterface {
  private genreRepo: GenresInterface;

  constructor(
    genreRepo: GenresInterface,
  ) {
    this.genreRepo = genreRepo;
  }

  async createGenre(name : string, description : string) : Promise<{genre : Genre}> {
    return this.genreRepo.createGenre(name, description);
  }

  async editGenre(id : string, name : string, description : string) : Promise<{success : boolean}> {
    return this.genreRepo.editGenre(id, name, description);
  }

  async getGenre(id : string) : Promise<Genre> {
    return this.genreRepo.getGenre(id);
  }

  async getGenres(skip : number, limit : number) : Promise<Genre[]> {
    return this.genreRepo.getGenres(skip, limit);
  }

  async getAllGenres() : Promise<Array<{id: string, name: string}>> {
    return this.genreRepo.getAllGenres();
  }

  async deleteGenre(id : string) : Promise<{success : boolean}> {
    return this.genreRepo.deleteGenre(id);
  }
}
