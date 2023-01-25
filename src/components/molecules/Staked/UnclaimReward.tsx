import { IcDebio, IcMyriad } from 'public/icons';
import React, { useState } from 'react';
import Button from 'src/components/atoms/Button';
import ListWallet from 'src/components/atoms/ListWallet';
import CardStaked from '../../atoms/CardStaked';
import ModalComponent from '../Modal';
import { SwitchNetwork } from '../SwitchNetwork';

export const UnclaimReward = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <CardStaked title="Unclaimed Reward">
        <div className="p-5 flex flex-col justify-between h-full">
          <div>
            <ListWallet
              image={IcMyriad}
              label="MYRIA"
              amount="30,000.0000"
              classes="pb-1"
            />
            <ListWallet
              image={IcDebio}
              label="DEBIO"
              amount="20,000.0000"
              classes="pb-1"
            />
          </div>
          <div className="flex gap-x-2">
            <Button
              onClick={handleOpenModal}
              label={'Claim Rewards'}
              primary
              isFullWidth
            />
          </div>
        </div>
      </CardStaked>
      <ModalComponent
        type="small"
        open={openModal}
        onClose={handleOpenModal}
        title={'Staking Rewards'}
      >
        <div className="min-h-[200px] mt-6">
          <div className="text-xs  text-darkGray mb-4">
            You might have unclaimed rewards in another network. Switch your
            network to view it.
          </div>
          <div className="text-xs  text-darkGray mb-5">
            All the reward is subject to a 10% claiming fee.
          </div>
          <div className="flex items-center text-[14px] text-softGray mb-5">
            <div>Network : </div>
            <SwitchNetwork handleSelect={() => null} />
          </div>
          <div className="mb-4">
            <ListWallet
              image={IcMyriad}
              label="MYRIA"
              amount="30,000.0000"
              network="myriad"
              classes="pb-3"
            />
            <ListWallet
              image={IcDebio}
              label="DEBIO"
              amount="20,000.0000"
              network="debio"
              classes="pb-3"
            />
          </div>

          <Button
            onClick={handleOpenModal}
            label={'Claim Rewards'}
            primary
            isFullWidth
          />
        </div>
      </ModalComponent>
    </>
  );
};
