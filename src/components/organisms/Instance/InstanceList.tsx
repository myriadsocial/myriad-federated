import React, { useEffect } from 'react';

import dynamic from 'next/dynamic';

import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import EmptyState from 'src/components/atoms/EmptyState';
import CardInstance from 'src/components/molecules/CardInstance';
import { useAuth } from 'src/hooks/use-auth.hook';
import { usePolkadotExtension } from 'src/hooks/use-polkadot-app.hook';
import { ServerListProps } from 'src/interface/ServerListInterface';

import { setCookie } from 'nookies';

import { useEnqueueSnackbar } from '../../molecules/Snackbar/useEnqueueSnackbar.hook';
import { DropdownFilter } from 'src/components/atoms';
import { Arrays } from 'src/constans/array';
import { numberFormatter } from 'src/utils/numberFormatter';
import { BN } from '@polkadot/util';
import { InstanceType } from 'src/hooks/use-instances.hook';

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
  balance: BN;
  onUpdateInstance?: (
    accountId: string,
    instance: ServerListProps,
    data: {
      [property: string]: any;
    },
    estimateFee?: boolean,
  ) => Promise<BN | void>;
  onRemoveInstance?: (
    accountId: string,
    instance: ServerListProps,
  ) => Promise<void>;
  onWithdrawReward?: (accountId: string, instanceId: number) => Promise<void>;
};

export const InstanceList: React.FC<InstanceListProps> = ({
  accountId,
  servers,
  balance,
  onUpdateInstance,
  onRemoveInstance,
  onWithdrawReward,
}) => {
  const enqueueSnackbar = useEnqueueSnackbar();
  const { loginDashboard } = useAuth();
  const { enablePolkadotExtension, getPolkadotAccounts } =
    usePolkadotExtension();

  const [apiURL, setApiURL] = React.useState<string>();
  const [accounts, setAccounts] = React.useState<InjectedAccountWithMeta[]>([]);
  const [extensionInstalled, setExtensionInstalled] = React.useState(false);
  const [showAccountList, setShowAccountList] = React.useState<boolean>(false);
  const [filteredServer, setFilteredServer] = React.useState<ServerListProps[]>(
    [],
  );
  const [filterName, setFilterName] = React.useState<string>('registered');

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

  useEffect(() => {
    console.log({ servers });
    const filtered = servers.filter(
      (server) => server.unstakedAt === null || server.unstakedAt === undefined,
    );
    setFilteredServer(filtered);
  }, [servers]);

  const handleChangeFilter = (type: string) => {
    setFilterName(type);
    let filtered;
    if (type === 'registered')
      filtered = servers.filter(
        (server) => server.unstakedAt === null || server.stakedAmount !== '0',
      );
    else
      filtered = servers.filter(
        (server) => server.unstakedAt != null && server.stakedAmount === '0',
      );
    console.log({ filtered });
    setFilteredServer(filtered);
  };

  const statusInstance = (server: ServerListProps) => {
    if (server.unstakedAt === null || server.stakedAmount !== '0') return true;
    else return false;
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
        <div className="mb-2">
          <DropdownFilter
            label="Instance Status :"
            data={Arrays.dataFilterInstance ?? []}
            value={filterName}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              // setSortingDate(event.target.value)
              handleChangeFilter(e.target.value)
            }
          />
        </div>
        {filteredServer.map((server) => {
          return (
            <CardInstance
              key={server.id}
              server={server}
              balance={balance}
              onClick={handleSignIn(server)}
              onUpdateInstance={onUpdateInstance}
              onRemoveInstance={onRemoveInstance}
              onWithdrawReward={onWithdrawReward}
              type={InstanceType.OWNED}
              status={statusInstance(server)}
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
