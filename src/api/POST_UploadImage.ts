import axios from './axiosInstance';
export async function UploadImage({
  file,
  baseUrl,
  accessToken,
}: {
  file: any;
  baseUrl: string;
  accessToken: string;
}) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios(baseUrl, accessToken).post(
      `/buckets/image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch {
    throw 'Error';
  }
}
