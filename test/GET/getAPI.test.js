const common = require('../common')
const expect = common.chai.expect
  
it.only('should return valid json response', () => {
    common.chai.request(common.main)
      .get('/').end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
      });
  });
