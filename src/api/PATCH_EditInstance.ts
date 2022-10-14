import axios from './axiosInstance';

interface BodyInterface {
  name: string;
  serverImageURL: string;
  description: string;
  categories?: Array<string>;
  accountId: object;
  images: object;
}

let config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmI4NzgwMTgyYmY2MDAxYjA5ZDYwOCIsIm5hbWUiOiJSb2ZpIiwidXNlcm5hbWUiOiJyb2ZpdGVzIiwiY3JlYXRlZEF0IjoiMjAyMi0wOC0xNlQxMjowMzoxMi41ODZaIiwicGVybWlzc2lvbnMiOlsidXNlciIsImFkbWluIl0sImlhdCI6MTY2NTcxNTkyMX0.XkzLk40qfe3S_1iN7s0DQWMg4Dml6JpqlXoYbEDx2Fs`,
  },
};
export async function patchEditInstance({
  baseUrl,
  accessToken,
  data,
}: {
  baseUrl: string;
  accessToken: string;
  data: BodyInterface;
}) {
  try {
    const result = await axios(baseUrl, accessToken).patch(`/server`, data);
    return result;
  } catch {
    console.log;
  }
}
