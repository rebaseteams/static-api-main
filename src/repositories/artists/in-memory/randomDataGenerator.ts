import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import * as fs from 'fs';
import { createConnection } from 'typeorm';
import Artist from '../../../models/entities/Artist';

const randomDataGenerator = async () => {
  const artistList = [];
  // axios.get('https://source.unsplash.com/random/1600x400').then((data) => {
  //   console.log(data.request.res.responseUrl);
  // });

  createConnection(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'concert_curator',
      synchronize: false,
      entities: [Artist],
    },
  ).then(async (connection) => {
    for (let i = 1; i < 50; i += 1) {
      const profile = await (await axios.get('https://randomuser.me/api/')).data.results[0];
      const gen = Math.floor(Math.random() * 99);
      const artistObj = new Artist(
        profile.login.uuid,
        `${profile.name.first} ${profile.name.last}`,
        profile.gender,
        [uuidv4(), uuidv4(), uuidv4()],
        [uuidv4(), uuidv4(), uuidv4()],
        profile.location.country,
        profile.picture.large,
        // `https://placeskull.com/1600/400/00000/${Math.floor(Math.random() * 44)}`,
        (await axios.get('https://source.unsplash.com/random/1600x400')).request.res.responseUrl,
        `${profile.name.first} ${profile.name.last} lives in ${profile.location.country}. ${profile.name.first} ${profile.name.last} is ${profile.gender}`,
        uuidv4(),
        profile.phone,
        `${profile.location.city},${profile.location.state},${profile.location.country},${profile.location.postcode}`,
        Math.floor(Math.random() * 99),
        [
          {
            demographicName: 'gender',
            fields: [
              {
                name: 'male',
                value: gen,
              },
              {
                name: 'female',
                value: 100 - gen,
              },
            ],
          },
          {
            demographicName: 'genre',
            fields: [
              {
                name: 'rock',
                value: Math.floor(Math.random() * 30),
              },
              {
                name: 'hip-hop',
                value: Math.floor(Math.random() * 30),
              },
              {
                name: 'jazz',
                value: Math.floor(Math.random() * 30),
              },
            ],
          },
          {
            demographicName: 'age group',
            fields: [
              {
                name: '18 - 25',
                value: Math.floor(Math.random() * 25),
              },
              {
                name: '26 - 35',
                value: Math.floor(Math.random() * 25),
              },
              {
                name: '36 - 60',
                value: Math.floor(Math.random() * 25),
              },
              {
                name: '60 +',
                value: Math.floor(Math.random() * 25),
              },
            ],
          },
        ],
        [
          {
            handleName: 'Youtube',
            url: 'https://www.youtube.com/c/PehchanMusic',
            logo: 'https://w7.pngwing.com/pngs/936/468/png-transparent-youtube-logo-youtube-logo-computer-icons-subscribe-angle-rectangle-airplane.png',
            followers: Math.floor(Math.random() * 1000000),
          },
          {
            handleName: 'Facebook',
            url: 'https://www.facebook.com/pehchanmusic/',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1200px-2021_Facebook_icon.svg.png',
            followers: Math.floor(Math.random() * 1000000),
          },
          {
            handleName: 'Spotify',
            url: 'https://open.spotify.com/playlist/5cPUQKih2Nan0u9nbhXtCu',
            logo: 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1475248336/qmsen1jtcy8xgsghzc8z.jpg',
            followers: Math.floor(Math.random() * 1000000),
          },
        ],
      );
      connection.manager.save(artistObj);
      artistList.push(artistObj);
    }
    fs.writeFileSync(`${__dirname}/data/artists.json`, JSON.stringify(artistList));
  });
};

randomDataGenerator();

export default randomDataGenerator;
