import React from 'react';

import dynamic from 'next/dynamic';

import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import EmptyState from 'src/components/atoms/EmptyState';
import CardInstance from 'src/components/molecules/CardInstance';
import { useAuth } from 'src/hooks/use-auth.hook';
import { usePolkadotExtension } from 'src/hooks/use-polkadot-app.hook';
import { ServerListProps } from 'src/interface/ServerListInterface';

import { setCookie } from 'nookies';

import { useEnqueueSnackbar } from '../../molecules/Snackbar/useEnqueueSnackbar.hook';

const PolkadotAccountList = dynamic(
  () =>
    import('src/components/molecules/PolkadotAccountList/PolkadotAccountList'),
  {
    ssr: false,
  },
);

type InstanceListProps = {
  accountId: string;
  servers: ServerListProps[];
};

export const InstanceList: React.FC<InstanceListProps> = ({
  accountId,
  servers,
}) => {
  const enqueueSnackbar = useEnqueueSnackbar();
  const { loginDashboard } = useAuth();
  const { enablePolkadotExtension, getPolkadotAccounts } =
    usePolkadotExtension();

  const [apiURL, setApiURL] = React.useState<string>();
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
    setApiURL(undefined);
  };

  const getAvailableAccounts = async () => {
    const accounts = await getPolkadotAccounts().catch(() => []);
    const currentAccounts = accounts.filter(
      (account) => account.address === accountId,
    );
    setAccounts(currentAccounts);
  };

  const handleSelectedSubstrateAccount = async (
    account: InjectedAccountWithMeta,
  ) => {
    try {
      await loginDashboard({ account, apiURL, callbackURL: '/dashboard' });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : `Unexpected error: ${err}`;

      enqueueSnackbar({
        message,
        variant: 'error',
      });
    } finally {
      closeAccountList();
    }
  };

  const handleSignIn = (server: ServerListProps) => () => {
    checkExtensionInstalled(server.apiUrl);
    setCookie(null, 'selectedInstance', JSON.stringify(server));
  };

  if (servers.length === 0) {
    return (
      <div className="w-full h-[400px] mt-6">
        <EmptyState
          title={'You don’t have an instance'}
          desc={
            'Create your own instance and enjoy the decentralized Web 3 social network.'
          }
        />
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="mt-2">
        {servers.map((server) => {
          return (
            <CardInstance
              key={server.id}
              onClick={handleSignIn(server)}
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
