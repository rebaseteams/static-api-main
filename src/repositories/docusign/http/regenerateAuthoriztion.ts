import axios from 'axios';

const updateAccessToken = (): Promise<string | boolean> => {
  const data = {
    grant_type: 'refresh_token',
    refresh_token: process.env.DOCUSIGN_REFRESH_TOKEN,
  };

  const config = {
    headers: {
      Authorization: `Basic ${process.env.DOCUSIGN_AUTHENTICATION_BASIC}`,
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve) => {
    axios.post(
      'https://account-d.docusign.com/oauth/token',
      data,
      config,
    ).then((res) => {
      process.env.DOCUSIGN_ACCESS_TOKEN = res.data.access_token;
      resolve(process.env.DOCUSIGN_ACCESS_TOKEN);
    }).catch(() => {
      resolve(false);
    });
  });
};

export default updateAccessToken;
