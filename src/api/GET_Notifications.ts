import axios from './axiosInstance';

export const getNotifications = async ({pageNumber, filter}: {pageNumber: number; filter: any}) => {
  return axios
    .get(`/api/notifications`, {
      params: {
        pageNumber: pageNumber,
        filter,
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log(e);
      return false;
    });
};
