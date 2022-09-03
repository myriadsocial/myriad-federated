import {useEffect, useState} from 'react';

import {ServerListProps} from 'src/interface/ServerListInterface';

import useBlockchain from 'src/components/common/Blockchain/useBlockchain.hook';

export const useAllInstances = () => {
  const {provider, loading: loadingBlockchain, error} = useBlockchain();

  const [serverList, setServerList] = useState<ServerListProps[]>([]);
  const [metric, setMetric] = useState({totalUsers: 0, totalPosts: 0, totalInstances: 0});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getInstances();
  }, [provider]);

  const getInstances = async () => {
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

  return {
    servers: serverList,
    metric,
    loading,
    error,
  };
};
