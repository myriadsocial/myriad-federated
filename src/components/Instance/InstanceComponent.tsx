import React, {useState} from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import {useRouter} from 'next/router';

import {IconButton, ListItemButton, Popover} from '@mui/material';

import {Backdrop, CircularProgress} from '@material-ui/core';

import {formatAddress} from 'src/helpers/formatAddress';
import {InstanceType, useInstances} from 'src/hooks/use-instances.hook';

import {destroyCookie} from 'nookies';
import {IcCopyOutline} from 'public/icons';

import Button from '../atoms/Button';
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

  const PolkadotIcon = dynamic(() => import('@polkadot/react-identicon'), {
    ssr: false,
  });
  const {createInstance, servers, loading} = useInstances(InstanceType.OWNED, accountId);

  const [open, setOpen] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // TODO: Handle logout
  const _handleLogout = () => {
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
      <Popover
        anchorEl={anchorEl}
        onClose={handleClose}
        open={openMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        style={{marginTop: 8}}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <div className="rounded-[10px] p-5 w-[360px]">
          <div className="text-sm font-semibold">Account</div>
          <div className="mt-4">
            <div className="text-xs fonts-semibold mb-2">Logged in</div>
            <div className="bg-[#EBE0FF] h-14 rounded-[4px] flex items-center w-full">
              <ListItemButton onClick={() => console.log('list click')}>
                <PolkadotIcon
                  value={accountId}
                  size={40}
                  theme="polkadot"
                  style={{marginRight: 8}}
                />
                <div className="text-base flex-1"> {formatAddress(accountId)}</div>
              </ListItemButton>
              <IconButton onClick={() => console.log('copy click')}>
                <Image alt="" src={IcCopyOutline} />
              </IconButton>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold my-4">Others</div>
            <div className="bg-selected-yellow h-14 rounded-[4px] flex items-center p-2">
              <PolkadotIcon value={accountId} size={40} theme="polkadot" style={{marginRight: 8}} />
              <div className="text-base flex-1"> {formatAddress(accountId)}</div>
              <IconButton onClick={() => console.log('copy click')}>
                <Image alt="" src={IcCopyOutline} />
              </IconButton>
            </div>
            <div className="h-14 rounded-[4px] flex items-center p-2">
              <PolkadotIcon value={accountId} size={40} theme="polkadot" style={{marginRight: 8}} />
              <div className="text-base flex-1"> {formatAddress(accountId)}</div>
              <IconButton>
                <Image alt="" src={IcCopyOutline} />
              </IconButton>
            </div>
          </div>
          <div className="flex mt-4 gap-2">
            <Button onClick={undefined} label="Switch Account" isFullWidth />
            <Button onClick={_handleLogout} label="Disconnect" primary isFullWidth />
          </div>
        </div>
      </Popover>
    </React.Fragment>
  );
};
