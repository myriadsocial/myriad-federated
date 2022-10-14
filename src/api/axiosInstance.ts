import getConfig from 'next/config';

import axios from 'axios';

const { publicRuntimeConfig } = getConfig();

const instance = (api?: string, accessToken?: string) =>
  axios.create({
    baseURL: api ?? publicRuntimeConfig.appAuthURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken}` : null,
    },
  });

export default instance;
