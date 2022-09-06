import axios from './axiosInstance';

import {UserNonce} from 'src/interface/UserInterface';

export async function getUserNonce(api: string, address: string): Promise<UserNonce> {
  try {
    const result = await axios(api).get(`/wallets/${address}/nonce`);
    return result.data;
  } catch {
    return {nonce: 0};
  }
}
