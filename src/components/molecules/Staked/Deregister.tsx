import React, { useCallback, useEffect, useState } from 'react';
import Button from 'src/components/atoms/Button';
import Gasfee from 'src/components/atoms/Gasfee';
import { usePolkadotExtension } from 'src/hooks/use-polkadot-app.hook';
import { ServerListProps } from 'src/interface/ServerListInterface';
import CardStaked from '../../atoms/CardStaked';
import ModalComponent from '../Modal';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { PolkadotAccountList } from '../PolkadotAccountList';
import { BN, BN_ZERO } from '@polkadot/util';

interface DeregisterProps {
  instance: ServerListProps;
  onRemoveInstance?: (
    accountId: string,
    instance: ServerListProps,
    estimateFee?: boolean,
  ) => Promise<BN | void>;
}

export const Deregister = (props: DeregisterProps) => {
  const { instance, onRemoveInstance } = props;
  const { enablePolkadotExtension, getPolkadotAccounts } =
    usePolkadotExtension();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [extensionInstalled, setExtensionInstalled] = useState(false);
  const [showAccountList, setShowAccountList] = useState<boolean>(false);
  const [estimateFee, setEstimateFee] = useState<string>('0');

  const getEstimateFee = useCallback(async () => {
    if (!onRemoveInstance) return;
    if (!openModal) return;
    const result = await onRemoveInstance(instance.owner, instance, true);
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

  const handleDeregister = () => {
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
    if (!onRemoveInstance) return;
    try {
      await onRemoveInstance(account.address, instance);
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
              label={
                Boolean(instance.unstakedAt)
                  ? instance.stakedAmount.lte(BN_ZERO)
                    ? 'Unstaked'
                    : 'Waiting for Unstaked'
                  : 'De-Register Instance'
              }
              isFullWidth
              disable={Boolean(instance.unstakedAt)}
              error
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
            <p className="mb-4">
              Please make sure you have enough $MYRIA to cover the
              De-Registration gas fees.
            </p>
            <p className="mb-4">
              Please carefully consider the following before deciding to unstake
              your $MYRIA tokens:
            </p>
            <ol className="list-decimal pl-4 my-4 gap-y-4">
              <li className="mb-4">
                De-Registering your Instance will remove it from the official
                Myriad Federation List, and it will not be eligible for future
                rewards.
              </li>
              <li className="mb-4">
                Your previously staked $MYRIA tokens will be returned to you
                after a 24 hours lock period.
              </li>
              <li className="mb-4">
                You will still be able to claim your Instance’s unclaimed
                rewards.
              </li>
              <li className="mb-4">
                Claiming unclaimed rewards must be done manually.
              </li>
            </ol>
          </div>
          <div className="mb-5">
            <Gasfee amount={estimateFee} />
          </div>
          <Button
            onClick={handleDeregister}
            label={'De-Register'}
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
