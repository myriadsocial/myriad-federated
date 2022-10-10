import React, { useState } from 'react';

import Image from 'next/image';

import { TextField } from '@mui/material';

import Button from 'src/components/atoms/Button';
import ModalComponent from 'src/components/molecules/Modal';

import { IcOpenUrl } from 'public/icons';

type InstanceStepperModalProps = {
  onCreateInstance: (apiURL: string, callback?: () => void) => void;
  open: boolean;
  onClose: () => void;
};

export const InstanceStepperModal: React.FC<InstanceStepperModalProps> = (
  props,
) => {
  const { onCreateInstance, open, onClose } = props;

  const [isStepOne, setIsStepOne] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleClick = async () => {
    if (isStepOne) return setIsStepOne(false);
    if (error || !value) return setError(true);
    onCreateInstance(value, () => handleClose());
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
    <ModalComponent
      type="small"
      open={open}
      onClose={handleClose}
      title={'Create Instance'}
    >
      <div className="min-h-[200px] mb-[100px]">
        <div className="mb-2">
          <div className="text-sm">Step {isStepOne ? 1 : 2} of 2</div>
        </div>
        <div className="text-2xl font-semibold">
          {isStepOne ? 'Deploy the server' : ' Register Instance'}
        </div>
        {isStepOne ? (
          <>
            <div className="my-5">
              <div className="text-sm text-darkGray text-justify">
                To create an instance, you have to{' '}
                <span className="font-bold">deploy the server on your own</span>
                . Please carefully read the deployment guide linked below. You
                can also access the deployment guide on the settings page.
              </div>
            </div>
            <div className="flex justify-center">
              <a
                href={`https://app.testnet.myriad.social/post/`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="w-[20px]">
                  <Image src={IcOpenUrl} height={20} width={20} alt="" />
                </button>
              </a>
              <div className="ml-2 text-base text-primary font-bold">
                View deployment guide
              </div>
            </div>
          </>
        ) : (
          <div className="mt-2">
            <div className="text-sm text-darkGray text-justify">
              To register your instance, you must enter the API URL of the
              deployed server. After signing the contract on Polkadot.js, your
              instance will be listed in Myriad app and published on Myriad
              Federation site.
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
        label={isStepOne ? 'Continue' : 'Publish Instance'}
        primary
        onClick={handleClick}
      />
    </ModalComponent>
  );
};

export default InstanceStepperModal;
