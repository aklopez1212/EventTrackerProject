export class Concert {
  id: number;
  name: string;
  venue: string;
  performer: string;
  genre: string;
  constructor(
    id: number = 0,
  name: string = '',
  venue: string = '',
  performer: string = '',
  genre: string = ''
  ){
    this.id = id;
  this.name = name;
  this.venue = venue;
  this.performer = performer;
  this.genre = genre;
  }

}
