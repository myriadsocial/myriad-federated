import { ChevronDownIcon } from '@heroicons/react/outline';
import {
  Backdrop,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { IcBackPrimary, IcDebio, IcMyriad } from 'public/icons';
import React from 'react';
import ListNetwork from 'src/components/atoms/ListNetwork';
import ListWallet from 'src/components/atoms/ListWallet';
import { ShimerComponent } from 'src/components/organisms/ServerList/Shimer';
import { InstanceType, useInstances } from 'src/hooks/use-instances.hook';
import { ServerListProps } from 'src/interface/ServerListInterface';
import ShowIf from '../common/show-if.component';

export type NetworkOptionProps = {
  onChangeNetwork?: (network: string) => Promise<void>;
};

export const SwitchNetwork: React.FC<NetworkOptionProps> = (props) => {
  const { onChangeNetwork } = props;
  const { currentNetworkId, setCurrentNetworkId } = useInstances(
    InstanceType.OWNED,
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeNetwork = (networkId: string) => {
    onChangeNetwork?.(networkId);
    setCurrentNetworkId(networkId);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        endIcon={
          <Image
            alt=""
            src={IcBackPrimary}
            height={16}
            width={16}
            className={'rotate-[-90deg]'}
          />
        }
        size="small"
        color="inherit"
      >
        <div className="text-[14px] capitalize text-[#12130F] ">
          {currentNetworkId}
        </div>
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleChangeNetwork('myriad')}>
          {currentNetworkId === 'myriad' && (
            <div className="h-full w-2 bg-primary absolute left-0 rounded-r"></div>
          )}
          <ListNetwork image={IcMyriad} label="Myriad" />
        </MenuItem>
        <MenuItem onClick={() => handleChangeNetwork('debio')}>
          {currentNetworkId === 'debio' && (
            <div className="h-full w-2 bg-primary absolute left-0 rounded-r"></div>
          )}
          <ListNetwork image={IcDebio} label="Debio" />
        </MenuItem>
      </Menu>
    </>
  );
};
