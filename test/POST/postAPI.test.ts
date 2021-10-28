import chai from '../common';
import main from '../common';

const { expect } = chai;

it.only('should return valid json response for post', (done) => {
  const data = {
    artists_data: [
      {
        artist_name: 'Adele',
        artist_id: '1234',
        match_percentage: 48,
        match_attributes: {
          venues: [
            {
              name: 'Samsung',
              match_percentage: 60,
            },
            {
              name: 'Sunburn',
              match_percentage: 20,
            },
          ],
          gender: 'Male',
          genre: 'Bollywood',
          age: '18-25',
          associated_brands: [
            {
              name: 'Coke Studio',
              contact: 'cokestudio.contact@coke.com',
              website: 'coke.com',
            },
          ],
        },
        summary: 'adele is well known bollywod singer with lot of hits',
      },
      {
        artist_name: 'Atif',
        artist_id: '1254',
        match_percentage: 30,
        match_attributes: {
          venues: [
            {
              name: 'Radio Mirchi',
              match_percentage: 60,
            },
          ],
          gender: 'Male',
          genre: 'Bollywood',
          age: '18-25',
          associated_brands: [
            {
              name: 'MTV Radio',
              contact: 'MTVradio.contact@mtv.com',
              website: 'mtv.com',
            },
          ],
        },
        summary: 'Atif is well known bollywod singer with lot of hits',
      },
      {
        artist_name: 'Prateek Kullhad',
        artist_id: '1546',
        match_percentage: 70,
        match_attributes: {
          venues: [
            {
              name: 'Concert',
              match_percentage: 60,
            },
          ],
          gender: 'Male',
          genre: 'Bollywood',
          age: '18-25',
          associated_brands: [
            {
              name: 'VH1 India',
              contact: 'vh1.contact@vh1.com',
              website: 'vh1.com',
            },
          ],
        },
        summary: 'Prateek is well known bollywod singer with lot of hits',
      },
      {
        artist_name: 'Neha Kakkar',
        artist_id: '1546',
        match_percentage: 70,
        match_attributes: {
          venues: [
            {
              name: 'SaReGaMa',
              match_percentage: 40,
            },
          ],
          gender: 'Female',
          genre: 'Bollywood',
          age: '26-35',
          associated_brands: [
            {
              name: 'Vh1',
              contact: 'vh1.contact@vh1.com',
              website: 'vh1.com',
            },
          ],
        },
        summary: 'Neha is well known bollywod singer with lot of hits',
      },
      {
        artist_name: 'Akon',
        artist_id: '1546',
        match_percentage: 70,
        match_attributes: {
          venues: [
            {
              name: 'SaReGaMa',
              match_percentage: 40,
            },
          ],
          gender: 'Female',
          genre: 'Bollywood',
          age: '26-35',
          associated_brands: [
            {
              name: 'Vh1',
              contact: 'vh1.contact@vh1.com',
              website: 'vh1.com',
            },
          ],
        },
        summary: 'Neha is well known bollywod singer with lot of hits',
      },
    ],
  };
  chai.request(main)
    .post('/recommender/api/getMatchData/')
    .send({})
    .end((err: any, res: { body: any; }) => {
      if (err) done(err);
      expect(res).to.have.status(200);
      // expect(res).matchPattern(pattern);
      expect(JSON.stringify(res.body)).to.equal(JSON.stringify(data));
      console.log(res.body);
      done();
    });
});
