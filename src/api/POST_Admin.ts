import axios from './axiosInstance';

export interface Credential {
  nonce: number;
  publicAddress: string;
  signature: string;
  walletType: string;
  networkType: string;
  apiURL?: string;
  address?: string;
}

interface SuccessProps {
  status: boolean;
}

export async function login(credential: Credential): Promise<SuccessProps> {
  try {
    const result = await axios().post(`/api/auth/login`, credential);
    return result.data;
  } catch {
    throw 'Unauthorized';
  }
}
