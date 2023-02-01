import { InputAdornment, TextField } from '@mui/material';
import { BN, BN_ZERO } from '@polkadot/util';
import Image from 'next/image';
import { IcMyriad, IcOpenUrl } from 'public/icons';
import React, { useCallback, useEffect, useState } from 'react';
import Button from 'src/components/atoms/Button';
import Gasfee from 'src/components/atoms/Gasfee';
import { usePolkadotExtension } from 'src/hooks/use-polkadot-app.hook';
import CardStaked from '../../atoms/CardStaked';
import ShowIf from '../common/show-if.component';
import ModalComponent from '../Modal';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { PolkadotAccountList } from '../PolkadotAccountList';
import { ServerListProps } from 'src/interface/ServerListInterface';

interface TotalStakedProps {
  instance: ServerListProps;
  onUpdateInstance?: (
    accountId: string,
    instance: ServerListProps,
    data: {
      [property: string]: any;
    },
    estimateFee?: boolean,
  ) => Promise<BN | void>;
  balance: {
    account: BN;
    staked: BN;
    formattedAccount: string;
    formattedStaked: string;
  };
}

export const TotalStaked = (props: TotalStakedProps) => {
  const { balance, instance, onUpdateInstance } = props;
  const { enablePolkadotExtension, getPolkadotAccounts } =
    usePolkadotExtension();

  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [extensionInstalled, setExtensionInstalled] = useState(false);
  const [showAccountList, setShowAccountList] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const [amount, setAmount] = useState<string>('0');
  const [rawStakeAmount, setRawStakeAmount] = useState(BN_ZERO);
  const [errorAmount, setErrorAmount] = useState<boolean>(false);
  const [estimateFee, setEstimateFee] = useState<string>('0');

  const getEstimateFee = useCallback(async () => {
    if (!onUpdateInstance) return;
    if (!openModal) return;
    const data =
      modalType === 'Stake'
        ? { StakeAmount: rawStakeAmount }
        : { UnstakeAmount: rawStakeAmount };
    const result = await onUpdateInstance(instance.owner, instance, data, true);
    if (result) setEstimateFee((+result.toString() / 10 ** 18).toFixed(4));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [rawStakeAmount, modalType, instance, accounts, openModal]);

  useEffect(() => {
    getEstimateFee();
  }, [getEstimateFee]);

  const handleOpenModal = (type: string) => {
    setAmount('0');
    setEstimateFee('0');
    setModalType(type);
    setOpenModal(!openModal);
    setErrorAmount(false);
    setRawStakeAmount(BN_ZERO);
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
    if (+value >= 100000 * 10 ** valueDecimal) {
      value = 100000 * 10 ** valueDecimal;
      fixedValue = '100,000';
    }
    const bnAmount = new BN(value.toString()).mul(updatedDecimal);
    const isValid = isValidAmount(bnAmount);
    setAmount(fixedValue);
    setRawStakeAmount(bnAmount);
    setErrorAmount(!isValid);
  };

  const isValidAmount = (value: BN) => {
    if (modalType === 'Stake') {
      const existensialDeposit = new BN((10 ** 16).toString());
      const bnAmount = balance.account.sub(existensialDeposit).sub(value);
      if (bnAmount.lt(BN_ZERO)) return false;
      return true;
    }

    const decimal = new BN((10 ** 18).toString());
    const minStakeAmount = new BN('50000');
    const bnMinStakeAmount = minStakeAmount.mul(decimal);

    if (balance.staked.sub(value).gte(bnMinStakeAmount)) {
      return true;
    }

    return false;
  };

  const onMax = () => {
    const decimal = 10 ** 18;

    let bnAmount = BN_ZERO;

    if (modalType === 'Stake') {
      const existensialDeposit = new BN((10 ** 16).toString());
      bnAmount = balance.account.sub(existensialDeposit);
    } else {
      const bnDecimal = new BN(decimal.toString());
      const minStakeAmount = new BN('50000');
      const bnMinStakeAmount = minStakeAmount.mul(bnDecimal);
      const result = (bnAmount = balance.staked.sub(bnMinStakeAmount));
      bnAmount = result.lte(BN_ZERO) ? BN_ZERO : result;
    }

    const amount = (+bnAmount.toString() / decimal).toLocaleString();
    setAmount(amount);
    setRawStakeAmount(bnAmount);
  };

  const handleStakeUnstake = () => {
    checkExtensionInstalled();
  };

  const checkExtensionInstalled = async () => {
    const installed = await enablePolkadotExtension();

    setShowAccountList(true);
    setExtensionInstalled(installed);

    getAvailableAccounts();
  };

  const getAvailableAccounts = async () => {
    const accounts = await getPolkadotAccounts().catch(() => []);
    const account = accounts.find((e) => e.address === instance.owner);
    if (account) setAccounts([account]);
  };

  const handleSelectedSubstrateAccount = async (
    account: InjectedAccountWithMeta,
  ) => {
    if (!onUpdateInstance) return;
    try {
      const data =
        modalType === 'Stake'
          ? { StakeAmount: rawStakeAmount }
          : { UnstakeAmount: rawStakeAmount };

      await onUpdateInstance(account.address, instance, data);
      onCloseAccountList();
    } catch (err) {
      console.log(err);
    }
  };

  const onCloseAccountList = () => {
    setShowAccountList(false);
    handleOpenModal(modalType);
  };

  return (
    <React.Fragment>
      <CardStaked title="Total Staked">
        <div className="p-5 flex flex-col justify-between h-full">
          <div>
            <div className="text-black font-semibold mb-1">
              <span className="text-3xl">{balance.formattedStaked}</span>
              <span className="text-md ml-1">MYRIA</span>
            </div>
            <div className="text-softGray text-[14px] mb-5">
              The minimum staking amount to keep your instance listed is{' '}
              <span className="text-primary">50,000</span> MYRIA.
            </div>
          </div>
          <div className="flex gap-x-2">
            <ShowIf condition={!Boolean(instance.unstakedAt)}>
              <Button
                onClick={() => handleOpenModal('Unstake')}
                label={`Unstake`}
                isFullWidth
              />
              <Button
                onClick={() => handleOpenModal('Stake')}
                label={'Stake'}
                primary
                isFullWidth
              />
            </ShowIf>
            <ShowIf condition={Boolean(instance.unstakedAt)}>
              <Button
                onClick={null}
                label={
                  instance.stakedAmount.lte(BN_ZERO)
                    ? 'Unstaked'
                    : 'Waiting for Unstaked'
                }
                primary
                isFullWidth
                disable
              />
            </ShowIf>
          </div>
        </div>
      </CardStaked>
      <ModalComponent
        type="small"
        open={openModal}
        onClose={() => handleOpenModal(modalType)}
        title={`${modalType}`}
      >
        <div className="min-h-[200px] mt-6">
          <div className="font-semibold mb-4">
            <div className="text-xs">Myriad Staked</div>
            <div className="text-lg">{balance.formattedStaked}</div>
          </div>
          <div className="mb-1">
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Amount"
              value={amount}
              onChange={handleChangeAmount}
              error={errorAmount}
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
                      onClick={onMax}
                      label={'MAX'}
                      primary
                      radius={4}
                      customStyle={{ height: '30px', fontSize: '12px' }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-input': {
                  padding: '12px 0px',
                },
              }}
            />
          </div>
          <div className="flex text-xs font-semibold">
            <div className="text-softGray3 mr-1">Wallet Balance: </div>
            <div>{balance.formattedAccount} MYRIA</div>
          </div>
          <ShowIf condition={modalType === 'Stake' && errorAmount}>
            <div className="text-xs text-error mt-1">
              Insufficient balance, add $MYRIA or input acceptable amounts.
            </div>
          </ShowIf>
          <ShowIf condition={modalType === 'Unstake' && errorAmount}>
            <div className="text-xs text-error mt-1">
              Insufficient staking balance.
            </div>
          </ShowIf>
          <ShowIf condition={modalType === 'Unstake'}>
            <div className="text-xs text-black mt-1">
              Your <span className="text-primary">50,000</span> MYRIA will not
              be eligible to unstake because it is used to list your instance in
              the official list. If you want to unstake all your funds, choose
              De-Register.
            </div>
          </ShowIf>
          <div className="mb-5 mt-3 flex flex-col gap-y-1">
            <a
              href={`https://app.ref.finance/#near%7Cmyriadcore.near`}
              target="_blank"
              rel="noreferrer"
              className="flex cursor-pointer items-center"
            >
              <Image src={IcOpenUrl} height={18} width={18} alt="" />
              <div className="ml-1 text-xs text-primary">Buy $MYRIA</div>
            </a>
            <a
              href={`https://mainnet.oct.network/bridge/near/myriad`}
              target="_blank"
              rel="noreferrer"
              className="flex cursor-pointer items-center"
            >
              <Image src={IcOpenUrl} height={18} width={18} alt="" />
              <div className="ml-1 text-xs text-primary">Bridge $MYRIA</div>
            </a>
          </div>
          <div className="mb-5">
            <Gasfee amount={estimateFee} />
          </div>
          <Button
            onClick={() => handleStakeUnstake()}
            label={`${modalType}`}
            primary
            isFullWidth
            disable={errorAmount}
          />
        </div>
      </ModalComponent>
      <PolkadotAccountList
        align="left"
        title="Select account"
        isOpen={showAccountList && extensionInstalled}
        accounts={accounts}
        onSelect={handleSelectedSubstrateAccount}
        onClose={onCloseAccountList}
      />
    </React.Fragment>
  );
};
