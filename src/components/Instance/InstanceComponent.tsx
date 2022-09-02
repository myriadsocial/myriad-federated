import React, {useState} from 'react';

import dynamic from 'next/dynamic';

import {useRouter} from 'next/router';
import {destroyCookie} from 'nookies';
import {Backdrop, CircularProgress} from '@material-ui/core';

import {InstanceList} from './InstanceList';
import {useStyles} from './Instance.styles';
import {InstanceHeader} from './InstanceHeader';
import {PolkadotJs} from 'src/lib/services/polkadot-js';
import {ServerListProps} from 'src/interface/ServerListInterface';

const InstanceStepperModal = dynamic(() => import('./InstanceStepperModal'), {
  ssr: false,
});

type InstanceComponentProps = {
  accountId: string;
  servers: ServerListProps[];
};

export const InstanceComponent: React.FC<InstanceComponentProps> = ({accountId, servers}) => {
  const router = useRouter();
  const style = useStyles();

  const [open, setOpen] = useState<boolean>(false);
  const [serverList, setServerList] = useState<ServerListProps[]>(servers);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateInstance = async (apiURL: string, callback?: () => void) => {
    // TODO: Handle create instance
    const polkadot = await PolkadotJs.connect();
    try {
      const txHash = await polkadot?.createServer(
        accountId,
        apiURL,
        async (server, signerOpened) => {
          if (signerOpened) setLoading(true);
          if (server) {
            fetch(`${server.apiUrl}/server`)
              .then(res => res.json())
              .then(data => {
                server.detail = data;
              })
              .catch(console.log)
              .finally(() => setServerList([...serverList, server]));
          }
        },
      );
      console.log(txHash);
    } catch (err) {
      console.log(err);
    } finally {
      await polkadot?.disconnect();
      callback && callback();
      setLoading(false);
    }
  };

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
      <InstanceList servers={serverList} accountId={accountId} />
      <InstanceStepperModal
        onCreateInstance={handleCreateInstance}
        open={open}
        onClose={toogleOpen}
      />
      <Backdrop className={style.backdrop} open={loading}>
        <CircularProgress />
      </Backdrop>
    </React.Fragment>
  );
};
