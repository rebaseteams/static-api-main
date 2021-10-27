/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = require('chai');
const main = require('../../dist/index.js');

describe('API test', () => {
  it.only('should return valid json response', () => {
    chai.request(main)
      .get('/').end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
      });
  });

  it.only('should return valid json response', () => {
    chai.request(main)
      .post('/recommender/api/getMatchData/')
      .send({})
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        console.log(res.body);
      });
  });
});
