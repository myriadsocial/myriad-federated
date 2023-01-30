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
  instanceType: InstanceType,
  accountId?: string,
  skip = false,
) => {
  const { provider, loading: loadingBlockchain, error } = useBlockchain();

  const enqueueSnackbar = useEnqueueSnackbar();
  const [serverList, setServerList] = useState<ServerListProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [metric, setMetric] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalInstances: 0,
  });

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
            const response = await fetch(
              `${server.apiUrl}/server?average=true`,
            );
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
            const response = await fetch(
              `${server.apiUrl}/server?average=true`,
            );
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
    if (skip) return;
    if (instanceType === InstanceType.ALL) {
      getAllInstances();
    } else {
      getOwnerInstances();
    }
  }, [getAllInstances, getOwnerInstances, instanceType, skip]);

  const createInstance = async (apiURL: string, callback?: () => void) => {
    try {
      if (!provider || !accountId) return;

      await provider.createServer(
        accountId,
        apiURL,
        async (server, signerOpened) => {
          if (signerOpened) setLoading(true);
          if (server) {
            fetch(`${server.apiUrl}/server?average=true`)
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
    server: ServerListProps,
  ) => {
    try {
      if (!provider || !accountId) return;

      await provider.updateApiUrl(
        accountId,
        server,
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
      setLoading(false);
    }
  };

  const fetchBalance = async (selectedServer?: ServerListProps) => {
    if (!provider || !accountId) return { account: 0, stake: 0 };

    let serverOwner: ServerListProps[] = [];
    let stakedBalance = 0;
    console.log(selectedServer);
    if (selectedServer) {
      serverOwner = [selectedServer];
    } else {
      if (instanceType === InstanceType.OWNED) {
        serverOwner = serverList;
      } else {
        serverOwner = await provider.serverListByOwner(accountId);
      }
    }

    for (const server of serverOwner) {
      if (!server.stakedAmount) continue;
      const balance = Number(server.stakedAmount.replace(/,/gi, ''));
      stakedBalance += balance;
    }

    const accountBalance = await provider.accountBalance(accountId);
    return {
      account: accountBalance,
      stake: stakedBalance,
    };
  };

  return {
    createInstance,
    updateInstance,
    servers: serverList,
    metric,
    loading,
    error,
    fetchBalance,
  };
};
