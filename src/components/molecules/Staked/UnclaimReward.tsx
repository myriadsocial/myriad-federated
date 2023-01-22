import { IcDebio, IcMyriad } from 'public/icons';
import React from 'react';
import Button from 'src/components/atoms/Button';
import ListWallet from 'src/components/atoms/ListWallet';
import CardStaked from '../../atoms/CardStaked';

export const UnclaimReward = () => {
  return (
    <CardStaked title="Unclaimed Reward">
      <div className="p-5 flex flex-col justify-between h-full">
        <div>
          <ListWallet image={IcMyriad} label="MYRIA" amount="30,000.0000" />
          <ListWallet image={IcDebio} label="DEBIO" amount="20,000.0000" />
        </div>
        <div className="flex gap-x-2">
          <Button onClick={null} label={'Claim Rewards'} primary isFullWidth />
        </div>
      </div>
    </CardStaked>
  );
};
