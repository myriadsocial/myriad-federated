import { useCallback, useEffect, useState } from 'react';

import useBlockchain from 'src/components/molecules/common/Blockchain/useBlockchain.hook';
import { ServerListProps } from 'src/interface/ServerListInterface';

import { setCookie } from 'nookies';

import { useEnqueueSnackbar } from '../components/molecules/Snackbar/useEnqueueSnackbar.hook';
import { BN, BN_ZERO } from '@polkadot/util';

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
  const [balance, setBalance] = useState<BN>(BN_ZERO);
  const [totalStaked, setTotalStaked] = useState<BN>(BN_ZERO);
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

      let totalStakedAmount = BN_ZERO;

      const [result, balance] = await Promise.all([
        provider.serverListByOwner(accountId),
        provider.accountBalance(accountId),
      ]);

      const servers = await Promise.all(
        result.map(async (server) => {
          if (server.stakedAmount) {
            totalStakedAmount = totalStakedAmount.add(server.stakedAmount);
          }

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
      setBalance(balance);
      setTotalStaked(totalStakedAmount);
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

  const createInstance = async (
    apiURL: string,
    stakeAmount: BN | null,
    callback?: () => void,
  ) => {
    try {
      if (!provider || !accountId) return;

      await provider.createServer(
        accountId,
        apiURL,
        stakeAmount,
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
    instance: ServerListProps,
    data: { [property: string]: any },
    estimateFee = false,
  ): Promise<BN | undefined> => {
    try {
      if (!provider || !accountId) return;

      const result = await provider.updateServer(
        accountId,
        instance,
        data,
        async (server, signerOpened) => {
          if (signerOpened) setLoading(true);
          if (server) {
            if (data?.UpdateApiUrl) {
              fetch(`${server.apiUrl}/server`)
                .then((res) => res.json())
                .then((data) => {
                  server.detail = data;
                })
                .catch(console.log)
                .finally(() => {
                  const newServerList = serverList.map((e) => {
                    if (e.id === server.id) return server;
                    return e;
                  });

                  setServerList([...newServerList]);
                });
            } else {
              const newServerList = serverList.map((e) => {
                if (e.id === server.id) return { ...e, ...server };
                return e;
              });

              let updateBalance = false;

              if (data?.StakeAmount) {
                setTotalStaked(totalStaked.add(data.StakeAmount));
                updateBalance = true;
              }

              if (data?.UnstakeAmount) {
                setTotalStaked(totalStaked.sub(data.UnstakeAmount));
                updateBalance = true;
              }

              if (updateBalance) {
                const balance = await provider.accountBalance(accountId);
                setBalance(balance);
              }

              setServerList([...newServerList]);
            }
          }
        },
        estimateFee,
      );

      if (estimateFee) return result as BN;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeInstance = async (
    accountId: string,
    instance: ServerListProps,
  ): Promise<void> => {
    try {
      if (!provider || !accountId) return;

      await provider.removeServer(
        accountId,
        instance,
        async (server, signerOpened) => {
          if (signerOpened) setLoading(true);
          if (server) {
            const newServerList = serverList.map((e) => {
              if (e.id === server.id) return { ...e, ...server };
              return e;
            });

            setServerList([...newServerList]);
          }
        },
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBalance = async (selected?: ServerListProps) => {
    if (!provider || !accountId) return { account: BN_ZERO, stake: BN_ZERO };

    let stakedBalance = new BN(0);

    const [serverOwner, accountBalance] = await Promise.all([
      !selected ? provider.serverListByOwner(accountId) : [selected],
      provider.accountBalance(accountId),
    ]);

    for (const server of serverOwner) {
      if (!server.stakedAmount) continue;
      stakedBalance = stakedBalance.add(server.stakedAmount);
    }

    return {
      account: accountBalance,
      stake: stakedBalance,
    };
  };

  return {
    createInstance,
    updateInstance,
    removeInstance,
    servers: serverList,
    metric,
    loading,
    error,
    balance,
    totalStaked,
    fetchBalance,
  };
};
