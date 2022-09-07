import {useEnqueueSnackbar} from './../components/molecules/Snackbar/useEnqueueSnackbar.hook';
import {useEffect, useState} from 'react';

import {ServerListProps} from 'src/interface/ServerListInterface';

import useBlockchain from 'src/components/common/Blockchain/useBlockchain.hook';

export enum InstanceType {
  ALL = 'all',
  OWNED = 'owner',
}

export const useInstances = (instanceType: InstanceType, accountId?: string) => {
  const {provider, loading: loadingBlockchain, error} = useBlockchain();
  const enqueueSnackbar = useEnqueueSnackbar();
  const [serverList, setServerList] = useState<ServerListProps[]>([]);
  const [metric, setMetric] = useState({totalUsers: 0, totalPosts: 0, totalInstances: 0});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (instanceType === InstanceType.ALL) {
      getAllInstances();
    } else {
      getOwnerInstances();
    }
  }, [provider, accountId]);

  const getAllInstances = async () => {
    let totalUsers = 0;
    let totalPosts = 0;

    try {
      if (!provider || loadingBlockchain) return;

      const [result, totalInstances] = await Promise.all([
        provider.serverList(),
        provider.totalServer(),
      ]);
      const servers = await Promise.all(
        result.map(async server => {
          let data = null;

          try {
            const response = await fetch(`${server.apiUrl}/server`);
            data = await response.json();
          } catch {
            // ignore
          }

          totalUsers += data?.metric?.totalUsers ?? 0;
          totalPosts += data?.metric?.totalPosts ?? 0;

          return {
            ...server,
            detail: data,
          };
        }),
      );

      setMetric({
        totalUsers,
        totalPosts,
        totalInstances,
      });
      setServerList(servers);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const getOwnerInstances = async () => {
    try {
      if (!provider || !accountId) return;

      const result = await provider.serverListByOwner(accountId);
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
      if (!provider || !accountId) return;

      await provider.createServer(accountId, apiURL, async (server, signerOpened) => {
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
    } catch (err: any) {
      enqueueSnackbar({
        message: err.toString(),
        variant: 'error',
      });
    } finally {
      callback && callback();
      setLoading(false);
    }
  };

  const updateInstance = async (
    server: ServerListProps,
    newApiURL: string,
    callback?: () => void,
  ) => {
    try {
      if (!provider || !accountId) return;

      await provider.updateApiURL(
        accountId,
        server.id,
        newApiURL,
        async (newServer, signerOpened) => {
          if (signerOpened) setLoading(true);
          if (newServer) {
            fetch(`${newServer.apiUrl}/server`)
              .then(res => res.json())
              .then(data => {
                newServer.detail = data;
              })
              .catch(console.log)
              .finally(() => {
                const newServerList = serverList.map(e => {
                  if (e.id === server.id) return newServer;
                  return e;
                });

                setServerList([...newServerList]);
              });
          }
        },
      );
    } catch (err) {
      console.log(err);
    } finally {
      callback && callback();
      setLoading(false);
    }
  };

  return {
    createInstance,
    updateInstance,
    servers: serverList,
    metric,
    loading,
    error,
  };
};
