/* eslint-disable no-console */
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import Genre from '../../../models/entities/Genre';
import fileCheck from '../../../utils/fileCheck';
import { GenresInterface } from '../../../models/interfaces/genre';

export default class GenreRepo implements GenresInterface {
  async createGenre(name : string, description : string) : Promise<{genre : Genre}> {
    const genre = new Genre(
      uuidv4(),
      name,
      description,
    );
    fileCheck(`${__dirname}/data`, false);
    fs.writeFileSync(`${__dirname}/data/${genre.id}.json`, JSON.stringify(genre));
    return { genre };
  }

  async getGenre(id : string) : Promise<Genre> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const readData = fs.readFileSync(`${__dirname}/data/${id}.json`).toString();
      const data = JSON.parse(readData) as Genre;
      return data;
    }
    const err = { message: `Genre not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async deleteGenre(id : string) : Promise<{success : boolean}> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      fs.unlinkSync(`${__dirname}/data/${id}.json`);
      return { success: true };
    }
    const err = { message: `Genre not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async editGenre(id : string, name : string, description : string) : Promise<{success : boolean}> {
    if (fs.existsSync(`${__dirname}/data/${id}.json`)) {
      const readData = fs.readFileSync(`${__dirname}/data/${id}.json`).toString();
      const data = JSON.parse(readData) as Genre;
      data.name = name;
      data.description = description;
      fs.writeFileSync(`${__dirname}/data/${id}.json`, JSON.stringify(data));
      return { success: true };
    }
    const err = { message: `Genre not found for id: ${id}`, statusCode: 404 };
    throw err;
  }

  async getGenres(skip : number, limit : number) : Promise<Genre[]> {
    let tracker = 0;
    fileCheck(`${__dirname}/data`, false);
    const allGenres : Genre[] = [];
    fs.readdirSync(`${__dirname}/data`).forEach((file, ind) => {
      if (skip - 1 < ind && tracker < limit) {
        tracker += 1;
        const toread = fs.readFileSync(`${__dirname}/data/${file}`).toString();
        const genre = JSON.parse(toread) as Genre;
        allGenres.push(genre);
      }
    });
    return allGenres;
  }
}
