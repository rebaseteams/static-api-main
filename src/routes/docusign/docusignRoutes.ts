import * as express from 'express';
import { DocusignInterface } from '../../models/interfaces/docusign';

export default class DocusignRoutes {
  router: express.Router;

  docusignService: DocusignInterface;

  // eslint-disable-next-line no-unused-vars
  constructor(docusignService: DocusignInterface) {
    this.router = express.Router();
    this.docusignService = docusignService;

    this.router.post('/', async (req, res, next) => {
      const data = JSON.parse(JSON.stringify(req.body));

      try {
        const response = await this.docusignService.createEnvelope(data);
        res.send(response);
      } catch (err) {
        next(err);
      }
      // try {
      //   const response = await axios.post(`${config.docusign.base_uri}/envelopes`, data, {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: config.docusign.authorization,
      //     },
      //   });
      //   fileCheck(`${__dirname}/data`, false);
      //   if (!fs.existsSync(`${__dirname}/data/envelopes.json`)) {
      //     fs.writeFileSync(`${__dirname}/data/envelopes.json`, '[]');
      //   }
      //   const envelopes: Array<any> = JSON.parse(fs.readFileSync(`${__dirname}/data/envelopes.json`, 'utf-8'));
      //   envelopes.push(response.data);
      //   fs.writeFileSync(`${__dirname}/data/envelopes.json`, JSON.stringify(envelopes));
      //   res.send(response.data);
      // } catch (error) {
      //   next(error);
      // }
    });
  }
}
