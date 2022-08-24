import axios from 'axios';
import getConfig from 'next/config';
const {publicRuntimeConfig} = getConfig();

const instance = axios.create({
  baseURL: publicRuntimeConfig.appAuthURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
