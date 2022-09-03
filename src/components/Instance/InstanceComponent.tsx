import React, {useState} from 'react';

import dynamic from 'next/dynamic';

import {useRouter} from 'next/router';
import {destroyCookie} from 'nookies';
import {Backdrop, CircularProgress} from '@material-ui/core';

import {InstanceList} from './InstanceList';
import {useStyles} from './Instance.styles';
import {InstanceHeader} from './InstanceHeader';
import {useOwnerInstances} from 'src/hooks/use-owner-instances.hooks';

const InstanceStepperModal = dynamic(() => import('./InstanceStepperModal'), {
  ssr: false,
});

type InstanceComponentProps = {
  accountId: string;
};

export const InstanceComponent: React.FC<InstanceComponentProps> = ({accountId}) => {
  const router = useRouter();
  const style = useStyles();

  const {createInstance, servers, loading} = useOwnerInstances(accountId);

  const [open, setOpen] = useState<boolean>(false);

  // TODO: Handle logout
  const handleLogout = () => {
    destroyCookie(null, 'currentAddress');
    router.push('/');
  };

  const toogleOpen = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <InstanceHeader accountId={accountId} onLogout={handleLogout} onOpenStepper={toogleOpen} />
      <InstanceList servers={servers} accountId={accountId} />
      <InstanceStepperModal onCreateInstance={createInstance} open={open} onClose={toogleOpen} />
      <Backdrop className={style.backdrop} open={loading}>
        <CircularProgress />
      </Backdrop>
    </React.Fragment>
  );
};
