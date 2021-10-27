/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const common = require('./common')
common.chai.use(common.chaiHttp)
const expect = common.chai.expect

describe('API test', () => {
    require('./GET/getAPI.test')
  require('./POST/postAPI.test')
});
