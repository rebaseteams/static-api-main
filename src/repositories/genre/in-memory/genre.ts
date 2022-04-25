/* eslint-disable no-console */
import { v4 as uuidv4 } from 'uuid';
import { Genre } from '../../../models/types/genre';
import { FileManagerInterface } from '../../../models/interfaces/file-manager';
import { GenresInterface } from '../../../models/interfaces/genre';

export default class GenreRepo implements GenresInterface {
  fileManager: FileManagerInterface;

  constructor(fileManager: FileManagerInterface) {
    this.fileManager = fileManager;
  }

  getAllGenres(): Promise<{ id: string; name: string; }[]> {
    throw new Error('Method not implemented.');
  }

  async createGenre(name: string, description: string): Promise<{ genre: Genre }> {
    const genre: Genre = {
      id: uuidv4(),
      name,
      description,
    };
    // fileCheck(`${__dirname}/data`, false);

    await this.fileManager.set(
      `genres/${genre.id}.json`, Buffer.from(JSON.stringify(genre)),
    );
    return { genre };
  }

  async getGenre(id: string): Promise<Genre> {
    const exists = await this.fileManager.exists(`genres/${id}.json`);

    if (exists) {
      const readData = await this.fileManager.get(`genres/${id}.json`);
      const data = JSON.parse(readData.data.toString()) as Genre;
      return data;
    }
    const err = { message: `Genre not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async deleteGenre(id: string): Promise<{ success: boolean }> {
    const exists = await this.fileManager.exists(`genres/${id}.json`);
    if (exists) {
      const delRes = await this.fileManager.delete(`genres/${id}.json`);
      return { success: delRes.success };
    }
    const err = { message: `Genre not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async editGenre(id: string, name: string, description: string): Promise<{ success: boolean }> {
    const exists = await this.fileManager.exists(`genres/${id}.json`);

    if (exists) {
      const readData = await this.fileManager.get(`genres/${id}.json`);
      const data = JSON.parse(readData.data.toString()) as Genre;
      data.name = name;
      data.description = description;

      const writeRes = await this.fileManager.set(`genres/${id}.json`, Buffer.from(JSON.stringify(data)));
      return { success: writeRes.success };
    }
    const err = { message: `Genre not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getGenres(skip: number, limit: number): Promise<Genre[]> {
    let tracker = 0;
    // fileCheck(`${__dirname}/data`, false);
    const allGenres: Genre[] = [];

    const files = await this.fileManager.list('genres');

    for (let ind = 0; ind < files.data.length; ind += 1) {
      if (skip - 1 < ind && tracker < limit) {
        const file = files[ind];
        tracker += 1;
        const toread = await this.fileManager.get(`genres/${file}`);
        const genre = JSON.parse(toread.data.toString()) as Genre;
        allGenres.push(genre);
      }
    }

    return allGenres;
  }
}
