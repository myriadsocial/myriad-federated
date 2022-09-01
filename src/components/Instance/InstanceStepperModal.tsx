import React, {useState} from 'react';

import Image from 'next/image';

import Button from 'src/components/atoms/Button';
import ModalComponent from 'src/components/molecules/Modal';

import {IcOpenUrl} from 'public/icons';

type InstanceStepperModalProps = {
  onCreateInstance: () => void;
  open: boolean;
  onClose: () => void;
};

export const InstanceStepperModal: React.FC<InstanceStepperModalProps> = props => {
  const {onCreateInstance, open, onClose} = props;

  const [isStepOne, setIsStepOne] = useState<boolean>(true);

  const handleClick = async () => {
    if (isStepOne) {
      setIsStepOne(false);
    } else {
      setIsStepOne(true);
      onClose();
      onCreateInstance();
    }
  };

  return (
    <ModalComponent type="small" open={open} onClose={onClose} title={'Create Instance'}>
      <div className="min-h-[200px] mb-[100px]">
        <div className="mb-2">
          <div className="text-sm">Step {isStepOne ? 1 : 2} of 2</div>
        </div>
        <div className="text-2xl font-semibold">
          {isStepOne ? 'Deploy the server' : 'Get server id'}
        </div>
        {isStepOne ? (
          <>
            <div className="my-2">
              <div className="text-sm text-textGray text-justify">
                To create an instance, you have to deploy the server on your own. Please carefully
                read the deployment guide linked below. You can also access the deployment guide on
                the settings page.
              </div>
            </div>
            <div className="flex">
              <a href={`https://app.testnet.myriad.social/post/`} target="_blank" rel="noreferrer">
                <button className="w-[20px]">
                  <Image src={IcOpenUrl} height={20} width={20} alt="" />
                </button>
              </a>
              <div className="ml-2 text-[14px] text-primary">View deployment guide</div>
            </div>
          </>
        ) : (
          <div className="mt-2">
            <div className="text-sm text-textGray text-justify">
              To get a server id, you have to sign the contract on Polkadot.js. The server id will
              show up in My Instance page, once you sign the contract.
            </div>
          </div>
        )}
      </div>
      <Button
        isFullWidth
        label={isStepOne ? 'Continue' : 'Get server id'}
        primary
        onClick={handleClick}
      />
    </ModalComponent>
  );
};

export default InstanceStepperModal;
