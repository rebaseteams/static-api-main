/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('API test', () => {
    require('./GET/getAPI.test')
    require('./POST/postAPI.test')
});
