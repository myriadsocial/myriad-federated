import axios from './axiosInstance';

export const getTopCurrencies = async () => {
  return axios()
    .get(`/api/currencies?top5currencies=true`)
    .then(response => {
      return response.data.data;
    })
    .catch(e => {
      console.log(e);
    });
};
