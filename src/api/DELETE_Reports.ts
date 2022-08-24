import axios from './axiosInstance';
export const deleteReports = async ({reportId}: {reportId: string}) => {
  return axios
    .delete(`/api/reports/${reportId}`)
    .then(response => {
      return response.data;
    })
    .catch(e => console.log(e.response.data));
};
