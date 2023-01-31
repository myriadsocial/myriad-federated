import { Network } from 'src/interface/NetworkInterface';

import axios from './axiosInstance';

export const getNetwork = async (
  url: string,
  networkId: string,
): Promise<Network | undefined> => {
  try {
    const { data } = await axios().get(`${url}/networks/${networkId}`, {});
    return data;
  } catch {
    // ignore
  }
};
