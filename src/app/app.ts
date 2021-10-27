export class Application {
    private db : any;
    private server : any;
    constructor ({db, server}) {
        this.db = db;
        this.server = server;
    }

    async start(container) {
        
    }
}