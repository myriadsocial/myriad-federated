import { useState, useEffect } from "react";

import { getServerList } from "src/lib/services/polkadot-js";

export const useGetList = () => {
  const [, setLoading] = useState(false);
  const [, setError] = useState(null);
  const [tipsEachNetwork] = useState("");

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);

    try {
      // const data = await getClaimTip(tipBalanceInfo, selectedNetwork?.rpcURL);
      const data = await getServerList();
      console.log(1);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    getList,
    tipsEachNetwork,
  };
};
