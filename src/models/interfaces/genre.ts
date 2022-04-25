/* eslint-disable no-unused-vars */
import { Genre } from '../types/genre';

export interface GenresInterface{
  createGenre(name : string, description: string) : Promise<{ genre : Genre }>;
  getGenre(id : string) : Promise<Genre>;
  deleteGenre(id : string) : Promise<{ success : boolean }>;
  editGenre(id : string, name : string, description : string) : Promise<{ success : boolean }>;
  getGenres(skip : number, limit : number) : Promise<Genre[]>;
  getAllGenres(): Promise<Array<{id: string, name: string}>>;
}
