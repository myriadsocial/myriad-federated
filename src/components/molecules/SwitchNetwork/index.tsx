import { ChevronDownIcon } from '@heroicons/react/outline';
import { Button, Menu, MenuItem, SvgIcon, Typography } from '@mui/material';
import Image from 'next/image';
import { IcBackPrimary, IcDebio, IcMyriad } from 'public/icons';
import React from 'react';
import ListNetwork from 'src/components/atoms/ListNetwork';
import ListWallet from 'src/components/atoms/ListWallet';

export type NetworkOptionProps = {
  handleSelect: (network: any) => void;
};

export const SwitchNetwork: React.FC<NetworkOptionProps> = ({
  handleSelect,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <div className="text-[14px] capitalize text-[#12130F] ">Myriad</div>
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <div className="h-full w-2 bg-primary absolute left-0 rounded-r"></div>
          <ListNetwork image={IcMyriad} label="Myriad" />
        </MenuItem>
        <MenuItem>
          <ListNetwork image={IcDebio} label="Debio" />
        </MenuItem>
      </Menu>
    </>
  );
};
