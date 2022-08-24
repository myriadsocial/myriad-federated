import axios from './axiosInstance';

export const updateReports = async ({reportId, status}: {reportId: string; status: string}) => {
  return axios
    .patch(`/api/reports/${reportId}`, {
      status: status,
      updatedAt: new Date(),
    })
    .then(response => {
      return response.data;
    })
    .catch(e => console.log(e.response.data));
};
