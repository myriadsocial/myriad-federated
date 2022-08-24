import {AxiosResponse} from 'axios';
import {ResponseUserReported} from '../interface/UserInterface';
import axios from './axiosInstance';

export const getReports = async ({pageNumber, filter}: {pageNumber: number; filter: string}) => {
  return axios
    .get(`/api/reports?pageNumber=${pageNumber}&filter=${filter}`, {})
    .then((response: AxiosResponse<ResponseUserReported>) => {
      return response.data;
    })
    .catch(e => console.log(e.response.data));
};
