import React from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import {Typography} from '@mui/material';

import Button from 'src/components/atoms/Button';
import {formatAddress} from 'src/helpers/formatAddress';

import {IcBackPrimary, MyriadFullBlack} from 'public/icons';

const PolkadotIcon = dynamic(() => import('@polkadot/react-identicon'), {
  ssr: false,
});

type InstanceHeaderProps = {
  accountId: string;
  onLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onOpenStepper: () => void;
  onClickBack: () => void;
};

export const InstanceHeader: React.FC<InstanceHeaderProps> = ({
  accountId,
  onLogout,
  onOpenStepper,
  onClickBack,
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
      <div className="mb-4 mt-12">
        <button onClick={onClickBack}>
          <div className="flex items-center hover:bg-slate-100 p-2 rounded-full">
            <Image alt="" src={IcBackPrimary} height={16} width={16} />
            <div className="ml-2 text-xs">Back</div>
          </div>
        </button>
      </div>
      <div className="flex justify-between">
        <div className="text-[28px]">My instances</div>
        <div className="w-[154px]">
          <Button isFullWidth label="Create Instance" primary onClick={onOpenStepper} />
        </div>
      </div>
    </React.Fragment>
  );
};
