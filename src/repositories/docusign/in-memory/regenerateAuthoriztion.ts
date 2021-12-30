import fs from 'fs';
import fileCheck from '../../../utils/fileCheck';
import configFile from './config.json';

const axios = require('axios');

const refreshAccessToken = () => {
  const data = JSON.stringify({
    grant_type: 'refresh_token',
    refresh_token: configFile.docusign.refresh_token,
  });
  const config = {
    method: 'post',
    url: 'https://account-d.docusign.com/oauth/token',
    headers: {
      Authorization: 'Basic YjUzMTRlODYtMzY4ZS00MDZmLWJjMjktNjE4OTZiNzA4N2UxOjRlOGM0YTdiLTFkMWEtNGYyNS1hNzU2LWRiOWYzZWM0MjE2Nw==',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  };

  axios(config)
    .then((response) => {
      fileCheck(`${__dirname}/config.json`);
      const configData = JSON.parse(fs.readFileSync(`${__dirname}/config.json`, 'utf-8'));
      configData.docusign.authorization = `Bearer ${response.data.access_token}`;
      configData.docusign.config.Authorization = `Bearer ${response.data.access_token}`;
      fs.writeFileSync(`${__dirname}/config.json`, configData);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
};

export default refreshAccessToken;
