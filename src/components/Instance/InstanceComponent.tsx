import React, {useState} from 'react';

import dynamic from 'next/dynamic';

import {Backdrop, CircularProgress} from '@material-ui/core';
import {useRouter} from 'next/router';
import {destroyCookie} from 'nookies';

import {InstanceType, useInstances} from 'src/hooks/use-instances.hooks';
import {useStyles} from './Instance.styles';
import {InstanceHeader} from './InstanceHeader';
import {InstanceList} from './InstanceList';

const InstanceStepperModal = dynamic(() => import('./InstanceStepperModal'), {
  ssr: false,
});

type InstanceComponentProps = {
  accountId: string;
};

export const InstanceComponent: React.FC<InstanceComponentProps> = ({accountId}) => {
  const router = useRouter();
  const style = useStyles();

  const {createInstance, servers, loading} = useInstances(InstanceType.OWNED, accountId);

  const [open, setOpen] = useState<boolean>(false);

  // TODO: Handle logout
  const handleLogout = () => {
    destroyCookie(null, 'session');
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
