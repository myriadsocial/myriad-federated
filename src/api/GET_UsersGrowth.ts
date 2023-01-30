import axios from './axiosInstance';

export const getUsersGrowth = async () => {
  return axios()
    .get(`/api/stats/user-growth?limit=10`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};
