import axios from './axiosInstance';

interface Credential {
  nonce: number;
  publicAddress: string;
  signature: string;
  walletType: string;
  networkType: string;
}

interface TokenObject {
  accessToken: string;
  tokenType?: string;
  expiresIn?: string | undefined;
  refreshToken?: string | undefined;
}

export async function loginAdmin(api: string, credential: Credential): Promise<TokenObject> {
  try {
    const result = await axios(api).post(`/admin/login`, credential);
    return result.data;
  } catch {
    throw 'Unauthorized';
  }
}
