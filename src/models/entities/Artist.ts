import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class Artist {
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    // this.brands = brands;  
    // this.venues = venues;
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  //   @Column()
  //   brands: string;

//   @Column()
//   venues: Array<string>;
}
