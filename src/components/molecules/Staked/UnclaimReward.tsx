import { IcDebio, IcMyriad } from 'public/icons';
import React, { useState } from 'react';
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

interface UnclaimRewardProps {
  instance: ServerListProps;
  onWithdrawReward?: (accountId: string, instanceId: number) => Promise<void>;
}

export const UnclaimReward = (props: UnclaimRewardProps) => {
  const { instance, onWithdrawReward } = props;
  const { enablePolkadotExtension, getPolkadotAccounts } =
    usePolkadotExtension();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [extensionInstalled, setExtensionInstalled] = useState(false);
  const [showAccountList, setShowAccountList] = useState<boolean>(false);

  const hasReward = instance.rewards && instance.rewards.length > 0;

  const handleOpenModal = () => {
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
            <ListWallet
              image={IcMyriad}
              label="MYRIA"
              amount="30,000.0000"
              classes="pb-1"
            />
            <ListWallet
              image={IcDebio}
              label="DEBIO"
              amount="20,000.0000"
              classes="pb-1"
            />
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
            <ListWallet
              image={IcMyriad}
              label="MYRIA"
              amount="30,000.0000"
              network="myriad"
              classes="pb-3"
            />
            <ListWallet
              image={IcDebio}
              label="DEBIO"
              amount="20,000.0000"
              network="debio"
              classes="pb-3"
            />
          </div>
          <div className="mb-5">
            <Gasfee amount="0.0001" />
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
