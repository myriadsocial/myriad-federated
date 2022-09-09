import React from 'react';

import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

import {InjectedAccountWithMeta} from '@polkadot/extension-inject/types';
import {decodeAddress} from '@polkadot/keyring';
import {u8aToHex} from '@polkadot/util';

import {getUserNonce} from 'src/api/GET_UserNonce';
import {loginAdmin} from 'src/api/POST_Admin';
import CardInstance from 'src/components/atoms/CardInstance';
import EmptyState from 'src/components/atoms/EmptyState';
import {usePolkadotExtension} from 'src/hooks/use-polkadot-app.hooks';
import {ServerListProps} from 'src/interface/ServerListInterface';
import {PolkadotJs} from 'src/lib/services/polkadot-js';

import {setCookie} from 'nookies';
import { useEnqueueSnackbar } from '../molecules/Snackbar/useEnqueueSnackbar.hook';

const PolkadotAccountList = dynamic(
  () => import('src/components/PolkadotAccountList/PolkadotAccountList'),
  {
    ssr: false,
  },
);

type InstanceListProps = {
  accountId: string;
  servers: ServerListProps[];
};

export const InstanceList: React.FC<InstanceListProps> = ({accountId, servers}) => {
  const router = useRouter();
  const enqueueSnackbar = useEnqueueSnackbar();
  const {enablePolkadotExtension, getPolkadotAccounts} = usePolkadotExtension();

  const [apiURL, setApiURL] = React.useState<string | null>(null);
  const [accounts, setAccounts] = React.useState<InjectedAccountWithMeta[]>([]);
  const [extensionInstalled, setExtensionInstalled] = React.useState(false);
  const [showAccountList, setShowAccountList] = React.useState<boolean>(false);

  const checkExtensionInstalled = async (url: string) => {
    const installed = await enablePolkadotExtension();

    setShowAccountList(true);
    setExtensionInstalled(installed);
    setApiURL(url);

    getAvailableAccounts();
  };

  const closeAccountList = () => {
    setShowAccountList(false);
    setApiURL(null);
  };

  const getAvailableAccounts = async () => {
    const accounts = await getPolkadotAccounts().catch(() => []);
    const currentAccounts = accounts.filter(account => account.address === accountId);

    setAccounts(currentAccounts);
  };

  const handleSelectedSubstrateAccount = async (account: InjectedAccountWithMeta) => {
    if (!apiURL) return;

    try {
      const toHex = u8aToHex(decodeAddress(account.address));
      const userNonce = await getUserNonce(apiURL, toHex);

      if (!userNonce.nonce) return console.log('error');

      const signature = await PolkadotJs.signWithWallet(account, userNonce.nonce);
      const token = await loginAdmin(apiURL, {
        nonce: userNonce.nonce,
        signature,
        publicAddress: toHex,
        walletType: 'polkadot{.js}',
        networkType: 'polkadot',
      });

      setCookie(
        null,
        'session',
        JSON.stringify({
          currentAddress: account.address,
          apiURL: apiURL,
          token: token.accessToken,
        }),
      );

      router.push(`/dashboard`);
    } catch (err:any) {
       enqueueSnackbar({
        message: err.toString(),
        variant: 'error',
      });
    } finally {
      closeAccountList();
    }
  };

  const handleSignIn = (url: string) => () => {
    checkExtensionInstalled(url);
  };

  if (servers.length === 0) {
    return (
      <div className="w-full h-[400px] mt-6">
        <EmptyState
          title={'You don’t have an instance'}
          desc={'Create your own instance and enjoy the decentralized Web 3 social network.'}
        />
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="mt-2">
        {servers.map(server => {
          return (
            <CardInstance
              key={server.id}
              onClick={handleSignIn(server.apiUrl)}
              serverName={server?.detail?.name ?? 'Unknown Instance'}
              serverDetail={`by ${accountId}`}
              serverDescription={`Instance Id: ${server.id}`}
              image={server?.detail?.serverImageURL ?? ''}
            />
          );
        })}
      </div>
      <PolkadotAccountList
        align="left"
        title="Select account"
        isOpen={showAccountList && extensionInstalled}
        accounts={accounts}
        onSelect={handleSelectedSubstrateAccount}
        onClose={closeAccountList}
      />
    </React.Fragment>
  );
};
