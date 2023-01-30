import axios from './axiosInstance';

export async function getServersMetric({ baseUrl }: { baseUrl: string }) {
  try {
    const result = await axios(baseUrl).get(`/server`);
    return result.data;
  } catch {
    console.log;
  }
}
