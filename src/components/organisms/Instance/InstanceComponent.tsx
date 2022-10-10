import React, { useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Backdrop, CircularProgress } from '@material-ui/core';

import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import { useAuth } from 'src/hooks/use-auth.hook';
import { InstanceType, useInstances } from 'src/hooks/use-instances.hook';
import { usePolkadotExtension } from 'src/hooks/use-polkadot-app.hook';

import { setCookie } from 'nookies';

import { PolkadotAccountList } from '../../molecules/PolkadotAccountList';
import SwitchAccount from '../../molecules/SwitchAccount';
import { useStyles } from './Instance.styles';
import { InstanceHeader } from './InstanceHeader';
import { InstanceList } from './InstanceList';

const InstanceStepperModal = dynamic(() => import('./InstanceStepperModal'), {
  ssr: false,
});

type InstanceComponentProps = {
  accountId: string;
};

export const InstanceComponent: React.FC<InstanceComponentProps> = ({
  accountId,
}) => {
  const style = useStyles();
  const router = useRouter();
  const [accounts, setAccounts] = React.useState<InjectedAccountWithMeta[]>([]);
  const { enablePolkadotExtension, getPolkadotAccounts } =
    usePolkadotExtension();
  const [showAccountList, setShowAccountList] = React.useState<boolean>(false);
  const [extensionInstalled, setExtensionInstalled] = React.useState(false);
  const { createInstance, servers, loading } = useInstances(
    InstanceType.OWNED,
    accountId,
  );

  const [open, setOpen] = useState<boolean>(false);

  const { logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const handleShowSwitchAccount = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const toogleOpen = () => {
    setOpen(!open);
  };

  const closeAccountList = () => {
    setShowAccountList(false);
  };

  const handleSelectedSubstrateAccount = async (
    account: InjectedAccountWithMeta,
  ) => {
    closeAccountList();
    setCookie(
      null,
      'session',
      JSON.stringify({ currentAddress: account.address }),
    );
    router.push('/instance');
  };

  return (
    <React.Fragment>
      <InstanceHeader
        accountId={accountId}
        onLogout={handleShowSwitchAccount}
        onOpenStepper={toogleOpen}
        onClickBack={() => router.push('/')}
      />
      <InstanceList servers={servers} accountId={accountId} />
      <InstanceStepperModal
        onCreateInstance={createInstance}
        open={open}
        onClose={toogleOpen}
      />
      <Backdrop className={style.backdrop} open={loading}>
        <CircularProgress />
      </Backdrop>
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
      />
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
