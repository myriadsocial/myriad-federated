import {useEffect, useState} from 'react';

import {ServerListProps} from 'src/interface/ServerListInterface';

import useBlockchain from 'src/components/common/Blockchain/useBlockchain.hook';

export const useOwnerInstances = (currentAddress: string) => {
  const {provider, error} = useBlockchain();

  const [serverList, setServerList] = useState<ServerListProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getInstances();
  }, [provider]);

  const getInstances = async () => {
    try {
      if (!provider || !currentAddress) return;

      const result = await provider.serverListByOwner(currentAddress);
      const servers = await Promise.all(
        result.map(async server => {
          let data = null;

          try {
            const response = await fetch(`${server.apiUrl}/server`);
            data = await response.json();
          } catch {
            // ignore
          }

          return {
            ...server,
            detail: data,
          };
        }),
      );

      setServerList(servers);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const createInstance = async (apiURL: string, callback?: () => void) => {
    try {
      if (!provider || !currentAddress) return;

      await provider.createServer(currentAddress, apiURL, async (server, signerOpened) => {
        if (signerOpened) setLoading(true);
        if (server) {
          fetch(`${server.apiUrl}/server`)
            .then(res => res.json())
            .then(data => {
              server.detail = data;
            })
            .catch(console.log)
            .finally(() => setServerList([...serverList, server]));
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      callback && callback();
      setLoading(false);
    }
  };

  return {
    createInstance,
    servers: serverList,
    loading,
    error,
  };
};
