import { ApiPromise, WsProvider } from "@polkadot/api";

export const connectToBlockchain = async () => {
  const provider = new WsProvider("wss://ws-rpc.dev.myriad.social");

  const api = await ApiPromise.create({ provider });
  await api.isReadyOrError;
  return api;
};

export const getServerList = async () => {
  try {
    const api = await connectToBlockchain();
    const pageSize = 10;
    // const startKey = "myriad";
    const result = await api.query.server.serverById.entriesPaged({
      args: [],
      pageSize,
    });

    const data = result.map((list) => {
      return list[1].toHuman();
    });

    return data;
  } catch (error) {
    console.log({ error });
    return null;
  }
};
