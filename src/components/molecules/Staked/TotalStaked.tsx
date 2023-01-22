import React from 'react';
import Button from 'src/components/atoms/Button';
import CardStaked from '../../atoms/CardStaked';

export const TotalStaked = () => {
  return (
    <CardStaked title="Total Staked">
      <div className="p-5 flex flex-col justify-between h-full">
        <div>
          <div className="text-black font-semibold mb-1">
            <span className="text-3xl">300,000.0000</span>
            <span className="text-md ml-1">MYRIA</span>
          </div>
          <div className="text-softGray text-[14px] mb-5">
            The minimum staking amount to keep your instance listed is{' '}
            <span className="text-primary">50,000</span> MYRIA.
          </div>
        </div>
        <div className="flex gap-x-2">
          <Button onClick={null} label={`Unstake`} isFullWidth />
          <Button onClick={null} label={'Stake'} primary isFullWidth />
        </div>
      </div>
    </CardStaked>
  );
};
