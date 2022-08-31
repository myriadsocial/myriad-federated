import {ApiPromise, WsProvider} from '@polkadot/api';
import getConfig from 'next/config';
import {ServerListProps} from 'src/interface/ServerListInterface';

const {publicRuntimeConfig} = getConfig();

export class PolkadotJs implements IProvider {
  private readonly _provider: ApiPromise;

  constructor(provider: ApiPromise) {
    this._provider = provider;
  }

  get provider() {
    return this._provider;
  }

  static async connect() {
    try {
      const provider = new WsProvider(publicRuntimeConfig.myriadRPCURL);
      const api = new ApiPromise({provider});

      await api.isReadyOrError;

      return new PolkadotJs(api);
    } catch {
      return null;
    }
  }

  async totalServer(): Promise<number> {
    try {
      const result = await this.provider.query.server.serverCount();

      return result.toJSON() as number;
    } catch {
      return 0;
    }
  }

  async serverList(startKey?: string, pageSize = 10): Promise<ServerListProps[]> {
    try {
      const result = await this.provider.query.server.serverById.entriesPaged({
        args: [],
        pageSize,
        startKey,
      });

      const data = result.map(list => {
        return list[1].toHuman();
      });

      return data as unknown as ServerListProps[];
    } catch (error) {
      console.log({error});
      return [];
    }
  }

  async serverListByOwner(
    accountId: string,
    startKey?: string,
    pageSize = 10,
  ): Promise<ServerListProps[]> {
    try {
      const result = await this.provider.query.server.serverByOwner.entriesPaged({
        args: [accountId],
        pageSize,
        startKey,
      });

      const data = result.map(list => {
        return list[1].toHuman();
      });

      return data as unknown as ServerListProps[];
    } catch {
      return [];
    }
  }

  async disconnect(): Promise<void> {
    await this.provider.disconnect();
  }
}

interface IProvider {
  provider: ApiPromise;

  totalServer: () => Promise<number>;

  serverList: (startKey?: string, pageSize?: number) => Promise<ServerListProps[]>;

  serverListByOwner: (
    accountId: string,
    startKey?: string,
    pageSize?: number,
  ) => Promise<ServerListProps[]>;

  disconnect: () => Promise<void>;
}
