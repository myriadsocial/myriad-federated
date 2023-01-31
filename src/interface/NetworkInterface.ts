import { BN } from '@polkadot/util';

export interface Network {
  id: string;
  image: string;
  rpcURL: string;
  explorerURL: string;
  blockchainPlatform: string;
}
