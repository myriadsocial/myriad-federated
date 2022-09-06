import React, {useState} from 'react';

import Image from 'next/image';

import Button from 'src/components/atoms/Button';
import ModalComponent from 'src/components/molecules/Modal';

import {IcOpenUrl} from 'public/icons';
import {TextField} from '@mui/material';

type InstanceStepperModalProps = {
  onCreateInstance: (apiURL: string, callback?: () => void) => void;
  open: boolean;
  onClose: () => void;
};

export const InstanceStepperModal: React.FC<InstanceStepperModalProps> = props => {
  const {onCreateInstance, open, onClose} = props;

  const [isStepOne, setIsStepOne] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleClick = async () => {
    if (isStepOne) {
      setIsStepOne(false);
    } else {
      if (error || !value) return setError(true);
      onCreateInstance(value, () => handleClose());
    }
  };

  const handleClose = () => {
    onClose();
    setIsStepOne(true);
    setError(false);
    setValue('');
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const isValid = isValidURL(newValue);

    setValue(newValue);
    setError(!isValid);
  };

  const isValidURL = (url: string) => {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  };

  return (
    <ModalComponent type="small" open={open} onClose={handleClose} title={'Create Instance'}>
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
              <div className="text-sm text-darkGray text-justify">
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
              <div className="ml-2 text-sm text-primary">View deployment guide</div>
            </div>
          </>
        ) : (
          <div className="mt-2">
            <div className="text-sm text-darkGray text-justify">
              To get a server id, you have to sign the contract on Polkadot.js. The server id will
              show up in My Instance page, once you sign the contract.
            </div>
            <div className="my-[24px]">
              <TextField
                id="outlined-basic"
                label="API URL"
                variant="outlined"
                value={value}
                onChange={handleChangeValue}
                error={error}
                helperText={error ? 'Invalid URL' : ''}
                fullWidth
              />
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