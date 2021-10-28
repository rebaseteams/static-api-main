export default class Application {
  private db;

  private server;

  constructor({ db, server } : {db : any, server : any}) {
    this.db = db;
    this.server = server;
  }
}
