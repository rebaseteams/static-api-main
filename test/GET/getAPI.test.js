import chai from '../common';
import main from '../common';

const { expect } = chai;

it.only('should return valid json response', (done) => {
  chai.request(main)
    .get('/').end((err: any, res: any) => {
      if (err) done(err);
      expect(res).to.have.status(200);
      done();
    });
});
