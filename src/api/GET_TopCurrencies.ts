import axios from './axiosInstance';

export const getTopCurrencies = async () => {
  return axios()
    .get(`/api/top-currencies`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};
