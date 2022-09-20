import React, {useState} from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import {useRouter} from 'next/router';

import {Button, Typography} from '@mui/material';

import ListSwitchAccount from 'src/components/atoms/ListSwithAccount';
import ModalComponent from 'src/components/molecules/Modal';
import SwitchAccount from 'src/components/molecules/SwitchAccount';
import {formatAddress} from 'src/helpers/formatAddress';
import {useAuth} from 'src/hooks/use-auth.hook';
import {InstanceType, useInstances} from 'src/hooks/use-instances.hook';
import {ServerListProps} from 'src/interface/ServerListInterface';

import {IcDropdownPrimary, IcNotification} from '../../../../public/icons';

const PolkadotIcon = dynamic(() => import('@polkadot/react-identicon'), {
  ssr: false,
});

const Header = ({title}: {title: string}) => {
  const router = useRouter();
  const {cookie, logout} = useAuth();
  const accountId = cookie?.session?.currentAddress ?? '';
  const selectedInstance: ServerListProps = cookie?.selectedInstance ?? '';
  const {servers} = useInstances(InstanceType.OWNED, accountId);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [instanceSelected, setInstanceSelected] = useState<number>();

  const handleClickNotification = () => {
    router.push('/dashboard/notification');
  };

  const handleSignIn = () => {
    setAnchorEl(null);
  };

  const handleShowSwitchAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSwitchInstance = (index: number) => {
    setInstanceSelected(index);
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
          }}>
          <div className="flex items-center">
            <div className="flex items-center">
              <Image
                alt=""
                src={(selectedInstance.detail?.images.logo_banner as string) ?? ''}
                className="rounded-full bg-blue-50"
                height={24}
                width={24}
              />
              <div className="mx-2">
                <div className="text-sm text-black capitalize text-left">
                  {formatAddress(selectedInstance.detail?.name as string) ?? ''}
                </div>
              </div>
            </div>
            <Image src={IcDropdownPrimary} height={20} width={20} alt="dropdown" />
          </div>
        </Button>
        <Button
          variant="contained"
          onClick={logout}
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
          }}>
          <div className="flex items-center">
            <PolkadotIcon value={accountId} size={24} theme="polkadot" style={{marginRight: 5}} />
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
          }}>
          <Image src={IcNotification} height={24} width={24} alt={'notification'} />
        </Button>
      </div>
      <SwitchAccount
        title="Instance"
        accountId={selectedInstance.detail?.name}
        image={selectedInstance.detail?.images.logo_banner as string}
        handleClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        openMenu={openMenu}
        handleLogout={() => router.push('/instance')}
        handleSwitchAccount={handleSignIn}
        leftButtonLabel={'Switch Instance'}
        rightButtonLabel={'Logout Instance'}
      />
      <ModalComponent open={true} onClose={() => undefined} title={'Select Instance'} type="small">
        <div className="mt-4 grid max-h-[400px] p-2 gap-4 overflow-y-auto">
          {servers.map((item, index) => {
            return (
              <ListSwitchAccount
                key={index}
                label={item.detail?.name}
                image={item.detail?.images.logo_banner as string}
                onClick={() => handleSwitchInstance(index)}
                type={instanceSelected === index ? 'switchInstance' : undefined}
              />
            );
          })}
        </div>
      </ModalComponent>
    </div>
  );
};

export default Header;
