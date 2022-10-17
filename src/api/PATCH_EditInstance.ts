import axios from './axiosInstance';

interface BodyInterface {
  name: string;
  serverImageURL: string;
  description: string;
  categories?: Array<string>;
  accountId: object;
  images: object;
}

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
