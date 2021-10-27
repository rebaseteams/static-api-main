/* eslint-disable linebreak-style */

import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import swaggerDoc from './swagger/swagger.json';

const corsOptions = {
  origin: '*',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));

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

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.get('/', (req, res) => {
  res.send('HELLO!');
});
app.post('/recommender/api/getMatchData/', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const body = JSON.stringify(req.body);
  res.send(data);
});
app.listen(3000, () => {
  // console.log('Server running on port 3000');
});

module.exports = app;
