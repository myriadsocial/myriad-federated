import { useState } from 'react';
import Button from 'src/components/atoms/Button';
import Gasfee from 'src/components/atoms/Gasfee';
import CardStaked from '../../atoms/CardStaked';
import ModalComponent from '../Modal';

export const Deregister = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <CardStaked title="De-Register Instance">
        <div className="p-5 flex flex-col justify-between h-full">
          <div>
            <div className="text-softGray text-xs mb-5">
              Your funds will be unstaked, and you will no longer receive
              rewards. Your instance will be removed from the official list.
            </div>
          </div>
          <div className="flex gap-x-2">
            <Button
              onClick={handleOpenModal}
              label={'De-Register Instance'}
              error
              isFullWidth
            />
          </div>
        </div>
      </CardStaked>
      <ModalComponent
        type="small"
        open={openModal}
        onClose={handleOpenModal}
        title={'De-Register Instance'}
      >
        <div className="min-h-[200px] mt-6">
          <div className="text-base text-darkGray text-justify mb-5">
            <p className="mb-4">
              Please make sure you have enough $MYRIA to cover the
              De-Registration gas fees.
            </p>
            <p className="mb-4">
              Please carefully consider the following before deciding to unstake
              your $MYRIA tokens:
            </p>
            <ol className="list-decimal pl-4 my-4 gap-y-4">
              <li className="mb-4">
                De-Registering your Instance will remove it from the official
                Myriad Federation List, and it will not be eligible for future
                rewards.
              </li>
              <li className="mb-4">
                Your previously staked $MYRIA tokens will be returned to you
                after a 24 hours lock period.
              </li>
              <li className="mb-4">
                You will still be able to claim your Instance’s unclaimed
                rewards.
              </li>
              <li className="mb-4">
                Claiming unclaimed rewards must be done manually.
              </li>
            </ol>
          </div>
          <div className="mb-5">
            <Gasfee amount="0.0001" />
          </div>
          <Button
            onClick={handleOpenModal}
            label={'De-Register'}
            primary
            isFullWidth
          />
        </div>
      </ModalComponent>
    </>
  );
};
