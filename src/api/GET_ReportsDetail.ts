import axios from './axiosInstance';

export const getReportsDetail = async ({id}: {id: string | undefined}) => {
  return axios
    .get(`/api/reports/${id}/users`)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log(e);
      return false;
    });
};
