import React, { useCallback, useEffect, useState } from 'react';
import Button from 'src/components/atoms/Button';
import Gasfee from 'src/components/atoms/Gasfee';
import ListWallet from 'src/components/atoms/ListWallet';
import { usePolkadotExtension } from 'src/hooks/use-polkadot-app.hook';
import CardStaked from '../../atoms/CardStaked';
import ModalComponent from '../Modal';
import { SwitchNetwork } from '../SwitchNetwork';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { ServerListProps } from 'src/interface/ServerListInterface';
import { PolkadotAccountList } from '../PolkadotAccountList';
import { BN } from '@polkadot/util';

interface UnclaimRewardProps {
  instance: ServerListProps;
  onWithdrawReward?: (
    accountId: string,
    instanceId: number,
    estimateFee?: boolean,
  ) => Promise<BN | void>;
  onChangeNetwork?: (
    network: string,
    instance: ServerListProps,
  ) => Promise<void>;
}

export const UnclaimReward = (props: UnclaimRewardProps) => {
  const { instance, onWithdrawReward } = props;
  const { enablePolkadotExtension, getPolkadotAccounts } =
    usePolkadotExtension();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [extensionInstalled, setExtensionInstalled] = useState(false);
  const [showAccountList, setShowAccountList] = useState<boolean>(false);
  const [estimateFee, setEstimateFee] = useState<string>('0');

  const hasReward = instance.rewards && instance.rewards.length > 0;

  const getEstimateFee = useCallback(async () => {
    if (!onWithdrawReward) return;
    if (!openModal) return;
    const result = await onWithdrawReward(instance.owner, instance.id, true);
    if (result) setEstimateFee((+result.toString() / 10 ** 18).toFixed(4));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [instance, accounts, openModal]);

  useEffect(() => {
    getEstimateFee();
  }, [getEstimateFee]);

  const handleOpenModal = () => {
    setEstimateFee('0');
    setOpenModal(!openModal);
  };

  const handleWithdraw = () => {
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
    if (!onWithdrawReward) return;
    try {
      await onWithdrawReward(account.address, instance.id);
      onCloseAccountList();
    } catch (err) {
      console.log(err);
    }
  };

  const onCloseAccountList = () => {
    setShowAccountList(false);
    handleOpenModal();
  };

  return (
    <React.Fragment>
      <CardStaked title="Unclaimed Reward">
        <div className="p-5 flex flex-col justify-between h-full">
          <div>
            {(instance?.rewards ?? []).map((reward) => {
              if (reward.amount <= 0) return <React.Fragment />;
              return (
                <ListWallet
                  key={reward.id}
                  image={reward.image}
                  label={reward.symbol}
                  amount={reward.amount.toLocaleString()}
                  classes="pb-1"
                />
              );
            })}
          </div>
          <div className="flex gap-x-2 mt-4">
            <Button
              onClick={handleOpenModal}
              label={'Claim Rewards'}
              primary
              isFullWidth
              disable={!hasReward}
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
            {(instance?.rewards ?? []).map((reward) => {
              if (reward.amount <= 0) return <React.Fragment />;
              return (
                <ListWallet
                  key={reward.id}
                  image={reward.image}
                  label={reward.symbol}
                  amount={reward.amount.toLocaleString()}
                  network={reward.networkId}
                  classes="pb-3"
                />
              );
            })}
          </div>
          <div className="mb-5">
            <Gasfee amount={estimateFee} />
          </div>

          <Button
            onClick={handleWithdraw}
            label={'Claim Rewards'}
            primary
            isFullWidth
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
