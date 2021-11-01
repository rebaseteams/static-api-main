import * as express from 'express';

export default class NotificationRoute {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.post('/', (req: express.Request, res: express.Response) => {
      try {
        const { type } = req.body;
        switch (type) {
          case 'email':
            res.send('email sent successfully');
            break;
          case 'facebook':
            res.send('facebook notification sent successfully');
            break;
          case 'twitter':
            res.send('twitter notification send successfully');
            break;
          default:
            res.status(422).send(JSON.stringify({
              message: 'No service available',
            }));
        }
      } catch (error) {
        res.status(500).send(JSON.stringify({
          errorMessage: 'Server error',
          error: true,
        }));
      }
    });
  }
}
