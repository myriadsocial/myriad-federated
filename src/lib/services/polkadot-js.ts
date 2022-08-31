import {ApiPromise, WsProvider} from '@polkadot/api';
import getConfig from 'next/config';
const {publicRuntimeConfig} = getConfig();

export interface ServerListProps {
  id: string;
  name: string;
  owner: string;
  apiUrl: string;
  webUrl: string;
  detail?: ServerDetail;
}

interface ServerDetail {
  id: string;
  description: string;
  name: string;
  categories: string[];
  metric: {
    totalExperiences: number;
    totalPosts: number;
    totalTransactions: number;
    totalUsers: number;
    totalVotes: number;
  };
  images: {
    logo_banner: string;
  };
}

export const connectToBlockchain = async (): Promise<ApiPromise> => {
  const provider = new WsProvider(publicRuntimeConfig.myriadRPCURL);

  const api: ApiPromise = await ApiPromise.create({provider});
  await api.isReadyOrError;
  return api;
};

export const getServerList = async (): Promise<ServerListProps[] | null> => {
  try {
    const api = await connectToBlockchain();
    const pageSize = 10;
    // const startKey = "myriad";
    const result = await api.query.server.serverById.entriesPaged({
      args: [],
      pageSize,
    });

    const data = result.map(list => {
      return list[1].toHuman();
    });

    return data as unknown as ServerListProps[];
  } catch (error) {
    console.log({error});
    return null;
  }
};
