import axios from './axiosInstance';

export async function getServersMatric({ baseUrl }: { baseUrl: string }) {
  try {
    const result = await axios(baseUrl).get(`/server?median=true`);
    return result.data;
  } catch {
    console.log;
  }
}
