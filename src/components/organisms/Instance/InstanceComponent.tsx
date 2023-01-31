import React, { useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import { useAuth } from 'src/hooks/use-auth.hook';
import { InstanceType, useInstances } from 'src/hooks/use-instances.hook';
import { usePolkadotExtension } from 'src/hooks/use-polkadot-app.hook';

import { setCookie } from 'nookies';

import { PolkadotAccountList } from '../../molecules/PolkadotAccountList';
import SwitchAccount from '../../molecules/SwitchAccount';

import { InstanceHeader } from './InstanceHeader';
import { InstanceList } from './InstanceList';
import { Backdrop, CircularProgress } from '@mui/material';
import { BN } from '@polkadot/util';

const InstanceStepperModal = dynamic(() => import('./InstanceStepperModal'), {
  ssr: false,
});

type InstanceComponentProps = {
  accountId: string;
};

export const InstanceComponent: React.FC<InstanceComponentProps> = ({
  accountId,
}) => {
  const router = useRouter();

  const { logout } = useAuth();
  const { enablePolkadotExtension, getPolkadotAccounts } =
    usePolkadotExtension();
  const {
    createInstance,
    updateInstance,
    removeInstance,
    servers,
    loading,
    balance,
    totalStaked,
  } = useInstances(InstanceType.OWNED, accountId);

  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showAccountList, setShowAccountList] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [extensionInstalled, setExtensionInstalled] = useState(false);

  const openMenu = Boolean(anchorEl);

  const checkExtensionInstalled = async () => {
    const installed = await enablePolkadotExtension();

    setShowAccountList(true);
    setExtensionInstalled(installed);

    getAvailableAccounts();
  };

  const handleSignIn = () => {
    setAnchorEl(null);
    checkExtensionInstalled();
  };

  const getAvailableAccounts = async () => {
    const accounts = await getPolkadotAccounts().catch(() => []);
    setAccounts(accounts);
  };

  const handleShowSwitchAccount = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectedSubstrateAccount = async (
    account: InjectedAccountWithMeta,
  ) => {
    setShowAccountList(false);
    setCookie(
      null,
      'session',
      JSON.stringify({ currentAddress: account.address }),
    );
    router.push('/instance');
  };

  const formatAmount = (value: BN): string => {
    const decimal = 10 ** 18;
    return (+value.toString() / decimal).toLocaleString();
  };

  return (
    <React.Fragment>
      <InstanceHeader
        accountId={accountId}
        onLogout={handleShowSwitchAccount}
        onOpenStepper={() => setOpen(!open)}
        onClickBack={() => router.push('/')}
      />
      <InstanceList
        servers={servers}
        accountId={accountId}
        balance={balance}
        onUpdateInstance={updateInstance}
        onRemoveInstance={removeInstance}
        loading={loading}
      />
      <InstanceStepperModal
        balance={balance}
        onCreateInstance={createInstance}
        open={open}
        onClose={() => setOpen(!open)}
      />
      <SwitchAccount
        title="Account"
        type="switchAccount"
        leftButtonLabel={'Switch Account'}
        rightButtonLabel={'Disconnect'}
        accountId={accountId}
        anchorEl={anchorEl}
        openMenu={openMenu}
        handleLogout={logout}
        handleClose={() => setAnchorEl(null)}
        handleSwitchAccount={handleSignIn}
        currentBalance={formatAmount(balance)}
        stakedBalance={formatAmount(totalStaked)}
      />
      <PolkadotAccountList
        align="left"
        title="Select account"
        isOpen={showAccountList && extensionInstalled}
        accounts={accounts}
        onSelect={handleSelectedSubstrateAccount}
        onClose={() => setShowAccountList(false)}
      />
      <Backdrop style={{ zIndex: 1400, color: '#fff' }} open={loading}>
        <CircularProgress style={{ color: '#7342CC' }} />
      </Backdrop>
    </React.Fragment>
  );
};
