import React, { useState } from 'react';

import Image from 'next/image';

import { InputAdornment, TextField } from '@mui/material';

import Button from 'src/components/atoms/Button';
import ModalComponent from 'src/components/molecules/Modal';

import { IcMyriad, IcOpenUrl } from 'public/icons';
import { NumberFormatCustom } from 'src/helpers/formatNumber';

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
  const [amount, setAmount] = useState<number>(0);
  const [errorAmount, setErrorAmount] = useState<boolean>(false);

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
    setAmount(0);
    setErrorAmount(false);
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const isValid = isValidURL(newValue);

    setValue(newValue);
    setError(!isValid);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const isValid = isValidAmount(newValue);

    setAmount(Number(newValue));
    setErrorAmount(!isValid);
  };

  const isValidURL = (url: string) => {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  };

  const isValidAmount = (amount: string) => {
    if (Number(amount) >= 50000) {
      return true;
    } else {
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
            <div>
              <a
                href={`https://app.testnet.myriad.social/post/`}
                target="_blank"
                rel="noreferrer"
                className="flex justify-center"
              >
                <Image src={IcOpenUrl} height={20} width={20} alt="" />

                <div className="ml-2 text-base text-primary font-bold">
                  View deployment guide
                </div>
              </a>
            </div>
          </>
        ) : (
          <div className="mt-2">
            <div className="text-sm text-darkGray text-justify">
              Before proceeding with the registration of the federated social
              media platform to the official list, please be aware of the
              following requirements:
              <ol className="list-decimal pl-4 my-4">
                <li>
                  You will need to provide the API URL of the deployed server.
                </li>
                <li>
                  You will need to stake in a minimum of $MYRIA 50,000 tokens.
                </li>
                <li>
                  You can partially unstake your fund, but you should keep at
                  least $MYRIA 50,000 staked to keep your instance registered.
                </li>
                <li>
                  There is 24h lock period before your $MYRIA can be withdrawn
                  if you decide to de-register your instance from Myriad.
                </li>
              </ol>
              You are acknowledging and agreeing to these requirements by
              proceeding.
            </div>
            <div className="my-[24px]">
              <TextField
                id="outlined-basic"
                label="Amount"
                variant="outlined"
                value={amount}
                onChange={handleChangeAmount}
                error={errorAmount}
                helperText={
                  errorAmount
                    ? 'Input must be greater than or equal to 50,000 MYRIA'
                    : ''
                }
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image src={IcMyriad} height={20} width={20} alt="" />
                    </InputAdornment>
                  ),
                  inputComponent: NumberFormatCustom as any,
                }}
              />
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
        disable={
          isStepOne
            ? false
            : amount === 0 || value === '' || error || errorAmount
        }
      />
    </ModalComponent>
  );
};

export default InstanceStepperModal;
