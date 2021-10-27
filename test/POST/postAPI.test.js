const common = require('../common')
const expect = common.chai.expect
  
    it.only('should return valid json response for post', () => {
      common.chai.request(common.main)
        .post('/recommender/api/getMatchData/')
        .send({})
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          console.log(res.body);
        });
    });
