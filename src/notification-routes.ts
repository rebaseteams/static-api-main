import * as express from 'express';

import sendEmail from './utils/sendEmail';

import config from './utils/config';

export default class NotificationRoute {
  router: express.Router;

  demoData: any = {
    type: 'email',
    receiver: {
      to: 'praveen.prajapati.rebase@gmail.com',
      cc: '',
    },
    sender: {
      vendor: {
        name: 'SENDGRID',
      },
      email: process.env.SEND_GRID_SENDER_EMAIL || config.SEND_GRID_SENDER_EMAIL,
    },
    content: {
      type: 'HTML',
      html: '<h2>Hello</h2>',
      subject: 'Testing email',
      values: '',
    },
  }

  constructor() {
    this.router = express.Router();
    this.router.post('/', (req: express.Request, res: express.Response) => {
      try {
        const { type } = req.body;
        const mailData = {
          ...req.body,
          sender: {
            vendor: req.body.sender.vendor,
            email: process.env.SEND_GRID_SENDER_EMAIL || config.SEND_GRID_SENDER_EMAIL,
          },
        };
        let response;
        switch (type) {
          case 'email':
            response = sendEmail(mailData);
            res.send(`Email sent Success: ${JSON.stringify(response)}`);
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
      } catch (error: any) {
        res.status(500).send(JSON.stringify({
          errorMessage: error.message,
          error: true,
        }));
      }
    });
  }
}
