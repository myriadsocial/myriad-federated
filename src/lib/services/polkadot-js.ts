import getConfig from 'next/config';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { numberToHex } from '@polkadot/util';

import { ServerListProps } from 'src/interface/ServerListInterface';

const { publicRuntimeConfig } = getConfig();

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
      const api = new ApiPromise({ provider });

      await api.isReadyOrError;

      return new PolkadotJs(api);
    } catch {
      return null;
    }
  }

  static async signWithWallet(
    account: InjectedAccountWithMeta,
    nonce: number,
    callback?: (signerOpened: boolean) => void,
  ): Promise<string> {
    try {
      const { web3FromSource } = await import('@polkadot/extension-dapp');

      callback && callback(true);

      const injector = await web3FromSource(account.meta.source);
      const signRaw = injector?.signer?.signRaw;

      if (signRaw) {
        const { signature } = await signRaw({
          address: account.address,
          data: numberToHex(nonce),
          type: 'bytes',
        });

        return signature;
      } else {
        throw 'ErrorSignature';
      }
    } catch (err) {
      throw err;
    }
  }

  async signer(accountId: string): Promise<InjectedAccountWithMeta> {
    const { enableExtension } = await import('src/helpers/extension');
    const allAccounts = await enableExtension();

    if (!allAccounts || allAccounts.length === 0) {
      throw new Error('Please import your account first!');
    }

    const currentAccount = allAccounts.find((account) => {
      // address from session must match address on polkadot extension
      return account.address === accountId;
    });

    if (!currentAccount) {
      throw new Error('Account not registered on Polkadot.js extension');
    }

    return currentAccount;
  }

  async createServer(
    owner: string,
    apiURL: string,
    callback?: (server?: ServerListProps, signerOpened?: boolean) => void,
  ): Promise<string | null> {
    try {
      const { web3FromSource } = await import('@polkadot/extension-dapp');

      const signer = await this.signer(owner);
      const injector = await web3FromSource(signer.meta.source);

      callback && callback(undefined, true);

      const extrinsic = this.provider.tx.server.register(apiURL);
      const txInfo = await extrinsic.signAsync(signer.address, {
        signer: injector.signer,
        nonce: -1,
      });

      let server;

      const txHash: string = await new Promise((resolve, reject) => {
        txInfo
          .send(({ status, isError, dispatchError, events }) => {
            events.forEach((record) => {
              const { event } = record;

              if (event.method === 'Registered')
                server = event.data[0].toHuman();
            });

            if (status.isInBlock) {
              console.log(`\tBlock hash    : ${status.asInBlock.toHex()}`);
            } else if (status.isFinalized) {
              console.log(`\tFinalized     : ${status.asFinalized.toHex()}`);
              resolve(status.asFinalized.toHex());
            } else if (isError) {
              console.log(`\tFinalized     : null`);
              reject('FailedToSendTip');
            }

            if (dispatchError) {
              if (dispatchError.isModule) {
                const { name } = this.provider.registry.findMetaError(
                  dispatchError.asModule,
                );

                reject(new Error(name));
              } else {
                const dispatchErrorType = dispatchError.toString();
                const parseDispatch = JSON.parse(dispatchErrorType);

                const values: string[] = Object.values(parseDispatch);

                reject(new Error(values[0] ?? 'ExtrinsicFailed'));
              }
            }
          })
          .catch((err) => {
            reject(err);
          });
      });

      callback && callback(server);

      return txHash;
    } catch (err) {
      throw err;
    }
  }

  async updateApiURL(
    owner: string,
    serverId: number,
    newApiURL: string,
    callback?: (server?: ServerListProps, signerOpened?: boolean) => void,
  ): Promise<string | null> {
    try {
      const { web3FromSource } = await import('@polkadot/extension-dapp');

      const signer = await this.signer(owner);
      const injector = await web3FromSource(signer.meta.source);

      callback && callback(undefined, true);

      const extrinsic = this.provider.tx.server.updateApiURL(
        serverId,
        newApiURL,
      );
      const txInfo = await extrinsic.signAsync(signer.address, {
        signer: injector.signer,
        nonce: -1,
      });

      const txHash: string = await new Promise((resolve, reject) => {
        txInfo
          .send(({ status, isError, dispatchError }) => {
            if (status.isInBlock) {
              console.log(`\tBlock hash    : ${status.asInBlock.toHex()}`);
            } else if (status.isFinalized) {
              console.log(`\tFinalized     : ${status.asFinalized.toHex()}`);
              resolve(status.asFinalized.toHex());
            } else if (isError) {
              console.log(`\tFinalized     : null`);
              reject('FailedToSendTip');
            }

            if (dispatchError) {
              if (dispatchError.isModule) {
                const { name } = this.provider.registry.findMetaError(
                  dispatchError.asModule,
                );

                reject(new Error(name));
              } else {
                const dispatchErrorType = dispatchError.toString();
                const parseDispatch = JSON.parse(dispatchErrorType);

                const values: string[] = Object.values(parseDispatch);

                reject(new Error(values[0] ?? 'ExtrinsicFailed'));
              }
            }
          })
          .catch((err) => {
            reject(err);
          });
      });

      callback &&
        callback({
          id: serverId,
          owner: owner,
          apiUrl: newApiURL,
        });

      return txHash;
    } catch (err) {
      throw err;
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

  async serverList(
    startKey?: string,
    pageSize = 10,
  ): Promise<ServerListProps[]> {
    try {
      const result = await this.provider.query.server.serverById.entriesPaged({
        args: [],
        pageSize,
        startKey,
      });

      const data = result
        .map((list) => {
          return list[1].toHuman();
        })
        .filter((list) => {
          return (list as unknown as ServerListProps).apiUrl?.startsWith(
            'https',
          );
        });

      return data as unknown as ServerListProps[];
    } catch (error) {
      console.log({ error });
      return [];
    }
  }

  async serverListByOwner(
    accountId: string,
    startKey?: string,
    pageSize = 10,
  ): Promise<ServerListProps[]> {
    try {
      const result =
        await this.provider.query.server.serverByOwner.entriesPaged({
          args: [accountId],
          pageSize,
          startKey,
        });

      const data = result.map((list) => {
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

export interface IProvider {
  provider: ApiPromise;

  signer: (accountId: string) => Promise<InjectedAccountWithMeta>;

  createServer: (
    owner: string,
    apiURL: string,
    callback?: (server?: ServerListProps, signerOpened?: boolean) => void,
  ) => Promise<string | null>;

  updateApiURL: (
    owner: string,
    serverId: number,
    newApiURL: string,
    callback?: (server?: ServerListProps, signerOpened?: boolean) => void,
  ) => Promise<string | null>;

  totalServer: () => Promise<number>;

  serverList: (
    startKey?: string,
    pageSize?: number,
  ) => Promise<ServerListProps[]>;

  serverListByOwner: (
    accountId: string,
    startKey?: string,
    pageSize?: number,
  ) => Promise<ServerListProps[]>;

  disconnect: () => Promise<void>;
}
