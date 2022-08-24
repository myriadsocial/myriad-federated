import axios from './axiosInstance';

export const getHealtcheck = async () => {
  return axios
    .get(`/health`)
    .then(() => {
      return true;
    })
    .catch(e => {
      console.log(e);
      return false;
    });
};
