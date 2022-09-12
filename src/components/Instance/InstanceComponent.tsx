import React, {useState} from 'react';

import dynamic from 'next/dynamic';

import {Backdrop, CircularProgress} from '@material-ui/core';

import {useAuth} from 'src/hooks/use-auth.hook';
import {InstanceType, useInstances} from 'src/hooks/use-instances.hook';

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
  const style = useStyles();

  const {logout} = useAuth();
  const {createInstance, servers, loading} = useInstances(InstanceType.OWNED, accountId);

  const [open, setOpen] = useState<boolean>(false);

  const toogleOpen = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <InstanceHeader accountId={accountId} onLogout={logout} onOpenStepper={toogleOpen} />
      <InstanceList servers={servers} accountId={accountId} />
      <InstanceStepperModal onCreateInstance={createInstance} open={open} onClose={toogleOpen} />
      <Backdrop className={style.backdrop} open={loading}>
        <CircularProgress />
      </Backdrop>
    </React.Fragment>
  );
};
