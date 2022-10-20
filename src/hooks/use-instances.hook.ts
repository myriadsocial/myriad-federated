import { useCallback, useEffect, useState } from 'react';

import useBlockchain from 'src/components/molecules/common/Blockchain/useBlockchain.hook';
import { ServerListProps } from 'src/interface/ServerListInterface';

import { setCookie } from 'nookies';

import { useEnqueueSnackbar } from '../components/molecules/Snackbar/useEnqueueSnackbar.hook';

export enum InstanceType {
  ALL = 'all',
  OWNED = 'owner',
}

export const useInstances = (
  instanceType?: InstanceType,
  accountId?: string,
) => {
  const { provider, loading: loadingBlockchain, error } = useBlockchain();

  const enqueueSnackbar = useEnqueueSnackbar();
  const [serverList, setServerList] = useState<ServerListProps[]>([]);
  const [metric, setMetric] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalInstances: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const getAllInstances = useCallback(async () => {
    let totalUsers = 0;
    let totalPosts = 0;

    try {
      if (!provider || loadingBlockchain) return;

      const [result, totalInstances] = await Promise.all([
        provider.serverList(),
        provider.totalServer(),
      ]);
      const servers = await Promise.all(
        result.map(async (server) => {
          let data = null;

          try {
            const response = await fetch(`${server.apiUrl}/server?median=true`);
            data = await response.json();
          } catch {
            // ignore
          }

          totalUsers += data?.metric?.totalUsers ?? 0;
          totalPosts += data?.metric?.totalPosts?.totalAll ?? 0;

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
  }, [loadingBlockchain, provider]);

  const getOwnerInstances = useCallback(async () => {
    try {
      if (!provider || !accountId) return;

      const result = await provider.serverListByOwner(accountId);
      const servers = await Promise.all(
        result.map(async (server) => {
          let data = null;

          try {
            const response = await fetch(`${server.apiUrl}/server?median=true`);
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
      setCookie(null, 'listOwnerInstances', JSON.stringify(servers));
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, [accountId, provider]);

  useEffect(() => {
    if (instanceType === InstanceType.ALL) {
      getAllInstances();
    } else {
      getOwnerInstances();
    }
  }, [getAllInstances, getOwnerInstances, instanceType]);

  const createInstance = async (apiURL: string, callback?: () => void) => {
    try {
      if (!provider || !accountId) return;

      await provider.createServer(
        accountId,
        apiURL,
        async (server, signerOpened) => {
          if (signerOpened) setLoading(true);
          if (server) {
            fetch(`${server.apiUrl}/server?median=true`)
              .then((res) => res.json())
              .then((data) => {
                server.detail = data;
              })
              .catch(console.log)
              .finally(() => setServerList([...serverList, server]));
          }
        },
      );
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
    accountId: string,
    newApiURL: string,
    serverId: number,
  ) => {
    try {
      if (!provider || !accountId) return;

      await provider.updateApiUrl(
        accountId,
        serverId,
        newApiURL,
        async (newServer, signerOpened) => {
          if (signerOpened) setLoading(true);
          if (newServer) {
            fetch(`${newServer.apiUrl}/server`)
              .then((res) => res.json())
              .then((data) => {
                newServer.detail = data;
              })
              .catch(console.log)
              .finally(() => {
                const newServerList = serverList.map((e) => {
                  if (e.id === serverId) return newServer;
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
