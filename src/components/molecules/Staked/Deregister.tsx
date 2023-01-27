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
            By De-Registering your Instance:
            <ol className="list-decimal pl-4 my-4 gap-y-4">
              <li className="mb-3">
                The federated social media you have registered with will be
                delisted from the official list.
              </li>
              <li className="mb-3">
                You will get your staked $MYRIA back after 24 hours.
              </li>
              <li className="mb-3">
                You will need to claim your reward manually.
              </li>
              <li className="mb-3">
                You can still claim the remaining rewards even after
                de-registering your instance.
              </li>
            </ol>
            Make sure you have enough $MYRIA to pay for the gas fee. Please
            consider this carefully before deciding to unstake your $MYRIA.
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
