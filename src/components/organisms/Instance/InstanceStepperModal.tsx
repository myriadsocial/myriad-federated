import React, { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import { InputAdornment, TextField } from '@mui/material';

import Button from 'src/components/atoms/Button';
import ModalComponent from 'src/components/molecules/Modal';

import { IcMyriad, IcOpenUrl } from 'public/icons';
import Gasfee from 'src/components/atoms/Gasfee';
import { BN } from '@polkadot/util';

type InstanceStepperModalProps = {
  balance: BN;
  onCreateInstance: (
    apiURL: string,
    stakeAmount: BN | null,
    callback?: () => void,
    estimateFee?: boolean,
  ) => Promise<BN | void>;
  open: boolean;
  onClose: () => void;
};

const MIN_STAKE_AMOUNT = new BN('50000000000000000000000'); // 50,000 MYRIA

export const InstanceStepperModal: React.FC<InstanceStepperModalProps> = (
  props,
) => {
  const { onCreateInstance, open, onClose, balance } = props;

  const [isStepOne, setIsStepOne] = useState<boolean>(true);
  const [apiURL, setApiURL] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('50,000');
  const [bnAmount, setBnAmount] = useState<BN>(MIN_STAKE_AMOUNT);
  const [errorAmount, setErrorAmount] = useState<boolean>(false);
  const [estimateFee, setEstimateFee] = useState<string>('0');

  const getEstimateFee = useCallback(async () => {
    const result = await onCreateInstance(apiURL, bnAmount, undefined, true);
    if (result) setEstimateFee((+result.toString() / 10 ** 18).toFixed(4));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [apiURL, bnAmount]);

  useEffect(() => {
    getEstimateFee();
  }, [getEstimateFee]);

  const handleClick = async () => {
    if (isStepOne) return setIsStepOne(false);
    if (error || !apiURL || errorAmount) return;
    onCreateInstance(apiURL, bnAmount, () => handleClose());
  };

  const handleClose = () => {
    onClose();
    setIsStepOne(true);
    setError(false);
    setApiURL('');
    setAmount('50,000');
    setErrorAmount(false);
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const isValid = isValidURL(newValue);

    setApiURL(newValue);
    setError(!isValid);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/gi, '');
    if (!rawValue.match(/^[0-9]*\.?[0-9]*$/)) return;
    const inputValue = rawValue.split('.');
    if (inputValue.length > 2) return;
    let inputDecimal = '';
    if (inputValue[1] != undefined) {
      if (inputValue[1] === '') inputDecimal = '.';
      else inputDecimal = `.${inputValue[1]}`;
    }

    let fixedValue = Number(inputValue[0]).toLocaleString() + inputDecimal;
    if (inputValue[1]?.length > 10) return;
    const valueDecimal = inputValue[1]?.length ?? 0;
    const updatedDecimal = new BN((10 ** (18 - valueDecimal)).toString());
    let value = +fixedValue.replace(/,/gi, '').replace(/\./gi, '');
    if (+value >= 1000000000000000 * 10 ** valueDecimal) return;
    const bnAmount = new BN(value.toString()).mul(updatedDecimal);
    const isValid = isValidAmount();
    setAmount(fixedValue);
    setBnAmount(bnAmount);
    setErrorAmount(!isValid);
  };

  const isValidURL = (url: string) => {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  };

  const isValidAmount = () => {
    const existensialDeposit = new BN((10 ** 16).toString());
    const bnAmount = balance.sub(existensialDeposit);
    if (bnAmount.lt(MIN_STAKE_AMOUNT)) return false;
    return true;
  };

  return (
    <ModalComponent
      type="small"
      open={open}
      onClose={handleClose}
      title={'Create Instance'}
    >
      <div className="min-h-[200px] ">
        <div className="mb-2">
          <div className="text-sm">Step {isStepOne ? 1 : 2} of 2</div>
        </div>
        <div className="text-2xl font-semibold">
          {isStepOne ? 'Deploy the server' : 'Registration Prerequisite'}
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
            <div className="pb-20">
              <a
                href={`https://myriadsocial.github.io/myriad-docs/#/maintain/run-your-own-server-guide/introduction`}
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
              <p>
                Before officially listing your Myriad instance in the Myriad
                Federation list, please be aware of the following prerequisites.
              </p>
              <p className="pt-4">You will need:</p>
              <ol className="list-decimal pl-4 my-4">
                <li>To provide the API URL of the deployed server.</li>
                <li>
                  To stake a minimum of 50,000 $MYRIA tokens (you can of course
                  stake a larger amount)
                </li>
              </ol>
              <p className="pb-4">
                Unstaking all your $MYRIA tokens will de-register your instance.
                The minimum 50,000 $MYRIA necessary to keep your instance
                registered will be returned after a lock period of 24h. Any
                exceeding balance can be unstaked with no lock period.
              </p>
            </div>
            <div className="my-[24px]">
              <TextField
                id="outlined-basic"
                label="Amount"
                variant="outlined"
                value={amount}
                onChange={handleChangeAmount}
                error={errorAmount}
                helperText={errorAmount ? 'Insufficient Balance' : ''}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image src={IcMyriad} height={20} width={20} alt="" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="my-[24px]">
              <TextField
                id="outlined-basic"
                label="API URL"
                variant="outlined"
                value={apiURL}
                onChange={handleChangeValue}
                error={error}
                helperText={error ? 'Invalid URL' : ''}
                fullWidth
              />
            </div>
            <div className="mb-5">
              <Gasfee amount={estimateFee} />
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
            : apiURL === '' ||
              error ||
              errorAmount ||
              !balance.gte(MIN_STAKE_AMOUNT)
        }
      />
    </ModalComponent>
  );
};

export default InstanceStepperModal;
