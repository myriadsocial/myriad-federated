import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button, Typography } from '@mui/material';

import ListSwitchAccount from 'src/components/atoms/ListSwithAccount';
import ModalComponent from 'src/components/molecules/Modal';
import SwitchAccount from 'src/components/molecules/SwitchAccount';
import { formatAddress } from 'src/helpers/formatAddress';
import { useAuth } from 'src/hooks/use-auth.hook';
import { usePolkadotExtension } from 'src/hooks/use-polkadot-app.hook';
import { ServerListProps } from 'src/interface/ServerListInterface';

import { setCookie } from 'nookies';

import { useQueryClient } from '@tanstack/react-query';
import { IcDropdownPrimary, IcNotification } from '../../../../public/icons';
import { useEnqueueSnackbar } from '../../molecules/Snackbar/useEnqueueSnackbar.hook';
import { InstanceType, useInstances } from 'src/hooks/use-instances.hook';

const PolkadotIcon = dynamic(() => import('@polkadot/react-identicon'), {
  ssr: false,
});
const Header = ({ title }: { title: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dataMetric = queryClient.getQueryData<any>(['/getServerMetric']);
  const enqueueSnackbar = useEnqueueSnackbar();

  const { cookie, switchInstance } = useAuth();
  const { enablePolkadotExtension, getPolkadotAccounts } =
    usePolkadotExtension();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [instanceSelected, setInstanceSelected] = useState<number | null>();
  const [showModalInstance, setShowModalInstance] = useState<boolean>(false);
  const [balance, setBalance] = useState({
    account: '0',
    stake: '0',
  });

  const accountId = cookie?.session?.currentAddress ?? '';
  const openMenu = Boolean(anchorEl);
  const selectedInstance: ServerListProps = cookie?.selectedInstance ?? '';
  const listOwnerInstances: Array<ServerListProps> =
    cookie?.listOwnerInstances ?? '';

  const { fetchBalance } = useInstances(InstanceType.OWNED, accountId, true);

  const handleClickNotification = () => {
    router.push('/dashboard/notification');
  };

  const handleShowSwitchAccount = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
    const { account, stake } = await fetchBalance(selectedInstance);
    const decimal = 10 ** 18;
    setBalance({
      account: (+account.toString() / decimal).toLocaleString(),
      stake: (+stake.toString() / decimal).toLocaleString(),
    });
  };

  const handleSwitchInstance = async (item: ServerListProps) => {
    const installed = await enablePolkadotExtension();
    setInstanceSelected(item.id);
    if (installed) {
      const accounts = await getPolkadotAccounts().catch(() => []);
      const currentAccounts = accounts.filter(
        (account) => account.address === item.owner,
      );
      try {
        setCookie(null, 'selectedInstance', JSON.stringify(item));
        await switchInstance({
          account: currentAccounts[0],
          apiURL: item.apiUrl,
        });

        setInstanceSelected(null);
        setShowModalInstance(false);
        router.reload();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : `Unexpected error: ${err}`;
        enqueueSnackbar({
          message,
          variant: 'error',
        });
        setInstanceSelected(null);
        setShowModalInstance(false);
      }
    }
  };

  return (
    <div className="px-6 py-[27px] flex justify-between text-black">
      <div className="text-[28px] font-semibold">{title}</div>
      <div className="flex items-center">
        <Button
          variant="contained"
          onClick={handleShowSwitchAccount}
          style={{
            height: 36,
            background: 'white',
            borderRadius: 36 / 2,
            minHeight: 0,
            marginRight: 16,
            padding: 0,
            paddingRight: 10,
            paddingLeft: 10,
          }}
        >
          <div className="flex items-center">
            <div className="flex items-center">
              <Image
                alt=""
                src={(dataMetric?.serverImageURL as string) ?? ''}
                className="rounded-full bg-blue-50"
                height={24}
                width={24}
              />
              <div className="mx-2">
                <div className="text-sm text-black capitalize text-left">
                  {formatAddress(dataMetric?.name as string) ?? ''}
                </div>
              </div>
            </div>
            <Image
              src={IcDropdownPrimary}
              height={20}
              width={20}
              alt="dropdown"
            />
          </div>
        </Button>
        <Button
          variant="contained"
          onClick={() => undefined}
          style={{
            height: 36,
            background: 'white',
            borderRadius: 36 / 2,
            minHeight: 0,
            minWidth: 0,
            marginRight: 16,
            padding: 0,
            paddingRight: 10,
            paddingLeft: 10,
          }}
        >
          <div className="flex items-center">
            <PolkadotIcon
              value={accountId}
              size={24}
              theme="polkadot"
              style={{ marginRight: 5 }}
            />
            <Typography color={'black'} fontSize={14}>
              {formatAddress(accountId)}
            </Typography>
          </div>
        </Button>

        <Button
          onClick={handleClickNotification}
          variant="contained"
          style={{
            height: 36,
            width: 36,
            background: 'white',
            borderRadius: 36 / 2,
            padding: 0,
            minHeight: 0,
            minWidth: 0,
          }}
        >
          <Image
            src={IcNotification}
            height={24}
            width={24}
            alt={'notification'}
          />
        </Button>
      </div>
      <SwitchAccount
        title="Instance"
        accountId={`${selectedInstance.detail?.name}`}
        image={selectedInstance.detail?.images.logo_banner as string}
        handleClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        openMenu={openMenu}
        handleLogout={() => router.push('/instance')}
        handleSwitchAccount={() => {
          setAnchorEl(null);
          setShowModalInstance(true);
        }}
        type="switchInstance"
        leftButtonLabel={'Switch Instance'}
        rightButtonLabel={'Logout Instance'}
        currentBalance={balance.account}
        stakedBalance={balance.stake}
      />
      <ModalComponent
        open={showModalInstance}
        onClose={() => setShowModalInstance(false)}
        title={'Select Instance'}
        type="small"
      >
        <div className="mt-4 grid max-h-[400px] p-2 gap-4 overflow-y-auto">
          {listOwnerInstances.length === 1 ? (
            <div>No instances to show</div>
          ) : (
            listOwnerInstances
              .filter((item) => item.id !== selectedInstance.id)
              .map((item, index) => {
                return (
                  <ListSwitchAccount
                    key={index}
                    label={`${item.detail?.name}`}
                    image={item.detail?.images.logo_banner as string}
                    onClick={() => handleSwitchInstance(item)}
                    type={
                      instanceSelected === item.id
                        ? 'listSwitchInstance'
                        : undefined
                    }
                    address={accountId ?? ''}
                  />
                );
              })
          )}
        </div>
      </ModalComponent>
    </div>
  );
};

export default Header;
