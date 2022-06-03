import { useState, useEffect } from "react";

import { getServerList } from "src/lib/services/polkadot-js";

export const useGetList = () => {
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);
  const [servers, setServers] = useState([]);
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
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    servers,
    totalInstances,
    totalUsers,
    totalPosts,
    loading,
  };
};
