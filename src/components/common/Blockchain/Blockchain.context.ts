import {createContext} from 'react';
import {IProvider} from 'src/lib/services/polkadot-js';

export type HandleBlockchain = {
  provider: IProvider | null;
  loading: boolean;
  error: boolean;
};

export default createContext<HandleBlockchain>({
  provider: null,
  loading: true,
  error: false,
});
