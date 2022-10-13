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
  data,
}: {
  baseUrl: string;
  data: BodyInterface;
}) {
  try {
    const result = await axios(baseUrl).patch(`/server`, data);
    return result.data;
  } catch {
    console.log;
  }
}
