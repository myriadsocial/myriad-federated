import axios from './axiosInstance';

export async function getAverageStats({ baseUrl }: { baseUrl: string }) {
  try {
    const result = await axios(baseUrl).get('/stats/average');
    return result.data;
  } catch {
    // ignore
  }
}
