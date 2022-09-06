import axios from 'axios';
import getConfig from 'next/config';
const {publicRuntimeConfig} = getConfig();

const instance = (api?: string) =>
  axios.create({
    baseURL: api ?? publicRuntimeConfig.appAuthURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export default instance;
