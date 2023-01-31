import getConfig from 'next/config';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { BN, numberToHex } from '@polkadot/util';

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
    stakeAmount: BN | null,
    callback?: (server?: ServerListProps, signerOpened?: boolean) => void,
  ): Promise<string | null> {
    try {
      const { web3FromSource } = await import('@polkadot/extension-dapp');

      const signer = await this.signer(owner);
      const injector = await web3FromSource(signer.meta.source);

      callback && callback(undefined, true);

      const extrinsic = this.provider.tx.server.register(apiURL, stakeAmount);
      const txInfo = await extrinsic.signAsync(signer.address, {
        signer: injector.signer,
        nonce: -1,
      });

      let server: any;

      const txHash: string = await new Promise((resolve, reject) => {
        txInfo
          .send(({ status, isError, dispatchError, events }) => {
            events.forEach((record) => {
              const { event } = record;

              if (event.method === 'Registered')
                server = event.data[0].toHuman() as any;
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

      if (server) {
        callback &&
          callback({
            ...server,
            stakedAmount: new BN(server.stakedAmount.replace(/,/gi, '')),
          });
      }

      return txHash;
    } catch (err) {
      throw err;
    }
  }

  async updateServer(
    owner: string,
    server: ServerListProps,
    data: { [property: string]: any },
    callback?: (server?: ServerListProps, signerOpened?: boolean) => void,
    estimateFee = false,
  ): Promise<string | null | BN> {
    try {
      const extrinsic = this.provider.tx.server.updateServer(server.id, data);

      if (estimateFee) {
        const { partialFee } = await extrinsic.paymentInfo(owner);
        return partialFee.toBn();
      }

      const { web3FromSource } = await import('@polkadot/extension-dapp');

      const signer = await this.signer(owner);
      const injector = await web3FromSource(signer.meta.source);

      callback && callback(undefined, true);

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

      let stakedAmount = server.stakedAmount;

      if (data?.StakeAmount) {
        stakedAmount = stakedAmount.add(data.StakeAmount);
      }

      if (data?.UnstakeAmount) {
        stakedAmount = stakedAmount.sub(data.UnstakeAmount);
      }

      callback &&
        callback({
          id: server.id,
          owner: data?.TransferOwner ? data.TransferOwner : server.owner,
          apiUrl: data?.UpdateApiUrl ? data.UpdateApiUrl : server.apiUrl,
          stakedAmount: stakedAmount,
          unstakedAt: server.unstakedAt,
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
          const server = list[1].toHuman() as any;
          return {
            ...server,
            stakedAmount: new BN(server.stakedAmount.replace(/,/gi, '')),
          };
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
        const server = list[1].toHuman() as any;
        return {
          ...server,
          stakedAmount: new BN(server.stakedAmount.replace(/,/gi, '')),
        };
      });

      return data as unknown as ServerListProps[];
    } catch {
      return [];
    }
  }

  async accountBalance(accountId: string): Promise<BN> {
    try {
      const result = await this.provider.query.system.account(accountId);
      const data = result.toHuman() as any;
      return new BN(data?.data?.free?.replace(/,/gi, '') ?? 0);
    } catch {
      return new BN(0);
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
    stakeAmount: BN | null,
    callback?: (server?: ServerListProps, signerOpened?: boolean) => void,
  ) => Promise<string | null>;

  updateServer: (
    owner: string,
    server: ServerListProps,
    data: { [property: string]: string },
    callback?: (server?: ServerListProps, signerOpened?: boolean) => void,
    estimateFee?: boolean,
  ) => Promise<string | null | BN>;

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

  accountBalance: (accountId: string) => Promise<BN>;

  disconnect: () => Promise<void>;
}
