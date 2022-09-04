import React, {useEffect, useState} from 'react';

import {IProvider, PolkadotJs} from 'src/lib/services/polkadot-js';
import {useIsMountedRef} from './useIsMountedRef.hook';

import BlockchainContext from './Blockchain.context';

type BlockchainProviderProps = {
  children: React.ReactNode;
};

const BlockchainProvider: React.ComponentType<BlockchainProviderProps> = ({children}) => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    if (!isMountedRef.current) return;
    connect();
  }, [isMountedRef]);

  const connect = async () => {
    try {
      const polkadot = await PolkadotJs.connect();
      setProvider(polkadot);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlockchainContext.Provider value={{provider, loading, error}}>
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainProvider;
