import React from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import Button from 'src/components/atoms/Button';

import {MyriadFullBlack} from 'public/icons';
import {Typography} from '@mui/material';

type InstanceHeaderProps = {
  accountId: string;
  onLogout: () => void;
  onOpenStepper: () => void;
};

const PolkadotIcon = dynamic(() => import('@polkadot/react-identicon'), {
  ssr: false,
});

export const InstanceHeader: React.FC<InstanceHeaderProps> = ({
  accountId,
  onLogout,
  onOpenStepper,
}) => {
  const formatAddress = () => {
    if (accountId.length <= 14) return accountId;
    return accountId.substring(0, 5) + '...' + accountId.substring(accountId.length - 5);
  };

  return (
    <React.Fragment>
      <div className="flex justify-between">
        <Image src={MyriadFullBlack} objectFit="contain" alt="" />

        <div className="w-[144px]">
          <Button onClick={onLogout} type="withChild">
            <div className="flex items-center">
              <PolkadotIcon value={accountId} size={24} theme="polkadot" style={{marginRight: 5}} />
              <Typography color={'black'} fontSize={14}>
                {formatAddress()}
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
