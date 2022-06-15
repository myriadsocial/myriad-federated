import { useState, useEffect } from "react";

import { getServerList, ServerListProps } from "src/lib/services/polkadot-js";

export const useGetList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [servers, setServers] = useState<ServerListProps[]>([]);
  const [totalInstances, setTotalInsctances] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = async () => {
    setLoading(true);

    try {
      const data = await getServerList();

      if (data) {
        data.map((list) => {
          fetch(`${list.apiUrl}/server`)
            .then((response) => response.json())
            .then((jsondata) => {
              list.detail = jsondata;
              setTotalUsers(totalUsers + jsondata.metric.totalUsers);
              setTotalPosts(totalUsers + jsondata.metric.totalPosts);
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });

          return list;
        });

        setServers(data);
        setTotalInsctances(data.length);
      }
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    servers,
    totalInstances,
    totalUsers,
    totalPosts,
    loading,
  };
};
