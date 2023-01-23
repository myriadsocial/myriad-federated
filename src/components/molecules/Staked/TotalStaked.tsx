import { InputAdornment, TextField } from '@mui/material';
import Image from 'next/image';
import { IcMyriad, IcOpenUrl } from 'public/icons';
import React, { useState } from 'react';
import Button from 'src/components/atoms/Button';
import { NumberFormatCustom } from 'src/helpers/formatNumber';
import CardStaked from '../../atoms/CardStaked';
import ModalComponent from '../Modal';

export const TotalStaked = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [errorAmount, setErrorAmount] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const isValid = isValidAmount(newValue);

    setAmount(Number(newValue));
    setErrorAmount(!isValid);
  };

  const isValidAmount = (amount: string) => {
    if (Number(amount) >= 50000) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
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
            <Button
              onClick={handleOpenModal}
              label={'Stake'}
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
        title={'Stake'}
      >
        <div className="min-h-[200px] mt-6">
          <div className="font-semibold mb-4">
            <div className="text-xs">Myriad Staked</div>
            <div className="text-lg">300,000.000</div>
          </div>
          <div className="mb-1">
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Amount"
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
                    <Image src={IcMyriad} height={24} width={24} alt="" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={null}
                      label={'MAX'}
                      primary
                      radius={4}
                      customStyle={{ height: '30px', fontSize: '12px' }}
                    />
                  </InputAdornment>
                ),
                inputComponent: NumberFormatCustom as any,
              }}
              sx={{
                '& .MuiInputBase-input': {
                  padding: '12px 0px',
                },
              }}
            />
          </div>
          <div className="flex text-xs font-semibold">
            <div className="text-softGray3 mr-1">Wallet Balance :</div>
            <div>10.000.000 MYRIA</div>
          </div>
          <div className="text-xs text-error mt-1">
            Insufficient balance, add $MYRIA or input acceptable amounts.
          </div>
          <div className="mb-5 mt-3 flex flex-col gap-y-1">
            <a
              href={`https://app.testnet.myriad.social/post/`}
              target="_blank"
              rel="noreferrer"
              className="flex cursor-pointer items-center"
            >
              <Image src={IcOpenUrl} height={18} width={18} alt="" />
              <div className="ml-1 text-xs text-primary">Buy $MYRIA</div>
            </a>
            <a
              href={`https://app.testnet.myriad.social/post/`}
              target="_blank"
              rel="noreferrer"
              className="flex cursor-pointer items-center"
            >
              <Image src={IcOpenUrl} height={18} width={18} alt="" />
              <div className="ml-1 text-xs text-primary">Bridge $MYRIA</div>
            </a>
          </div>
          <Button
            onClick={handleOpenModal}
            label={'Stake'}
            primary
            isFullWidth
          />
        </div>
      </ModalComponent>
    </>
  );
};
