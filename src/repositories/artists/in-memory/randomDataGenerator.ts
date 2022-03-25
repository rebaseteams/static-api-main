import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import * as fs from 'fs';
import { Artist } from '../../../models/types/artist';

const randomDataGenerator = async () => {
  const artistList = [];
  // axios.get('https://source.unsplash.com/random/1600x400').then((data) => {
  //   console.log(data.request.res.responseUrl);
  // });

  for (let i = 1; i < 50; i += 1) {
    const profile = await (await axios.get('https://randomuser.me/api/')).data.results[0];
    const gen = Math.floor(Math.random() * 99);
    const artistObj: Artist = {
      id: profile.login.uuid,
      name: `${profile.name.first} ${profile.name.last}`,
      gender: profile.gender,
      associated_brands: [uuidv4(), uuidv4(), uuidv4()],
      venues: [uuidv4(), uuidv4(), uuidv4()],
      country: profile.location.country,
      image: profile.picture.large, // `https://placeskull.com/1600/400/00000/${Math.floor(Math.random() * 44)}`,
      cover_image: (await axios.get('https://source.unsplash.com/random/1600x400')).request.res.responseUrl,
      bio: `${profile.name.first} ${profile.name.last} lives in ${profile.location.country}. ${profile.name.first} ${profile.name.last} is ${profile.gender}`,
      manager: uuidv4(),
      contact: profile.phone,
      address: `${profile.location.city},${profile.location.state},${profile.location.country},${profile.location.postcode}`,
      popularity: Math.floor(Math.random() * 99),
      audience: [
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
      media_handles: [
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
      brandAffinity: {
        xAxisData: [
          '100',
          '101',
          '102',
        ],
        yAxisData: [
          {
            name: 'Brand1',
            data: [
              {
                xAxis: '100',
                yAxis: 0,
              },
              {
                xAxis: '101',
                yAxis: 16,
              }],
          },
          {
            name: 'Brand2',
            data: [
              {
                xAxis: '100',
                yAxis: 0,
              },
              {
                xAxis: '101',
                yAxis: 83,
              }],
          },
        ],
      },
      popularityOverTime: {
        xAxisData: [
          '100',
          '101',
          '102',
        ],
        yAxisData: [
          {
            name: 'populatity-over-time',
            data: [
              {
                xAxis: '100',
                yAxis: 0,
              },
              {
                xAxis: '101',
                yAxis: 16,
              }],
          },
        ],
      },
    };

    artistList.push(artistObj);
  }
  fs.writeFileSync(`${__dirname}/data/artists.json`, JSON.stringify(artistList));
};

export default randomDataGenerator;
