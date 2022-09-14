import React from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import {Typography} from '@mui/material';

import Button from 'src/components/atoms/Button';
import {formatAddress} from 'src/helpers/formatAddress';

import {MyriadFullBlack} from 'public/icons';

const PolkadotIcon = dynamic(() => import('@polkadot/react-identicon'), {
  ssr: false,
});

type InstanceHeaderProps = {
  accountId: string;
  onLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onOpenStepper: () => void;
};

export const InstanceHeader: React.FC<InstanceHeaderProps> = ({
  accountId,
  onLogout,
  onOpenStepper,
}) => {
  return (
    <React.Fragment>
      <div className="flex justify-between">
        <Image src={MyriadFullBlack} objectFit="contain" alt="" />

        <div className="w-[144px]">
          <Button onClick={onLogout} type="withChild">
            <div className="flex items-center">
              <PolkadotIcon value={accountId} size={24} theme="polkadot" style={{marginRight: 5}} />
              <Typography color={'black'} fontSize={14}>
                {formatAddress(accountId)}
              </Typography>
            </div>
          </Button>
        </div>
      </div>

      <div className="flex justify-between mt-[50px]">
        <div className="text-[28px]">My instances</div>
        <div className="w-[154px]">
          <Button isFullWidth label="Create Instance" primary onClick={onOpenStepper} />
        </div>
      </div>
    </React.Fragment>
  );
};
