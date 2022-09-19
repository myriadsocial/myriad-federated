import React, {useState} from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import {useRouter} from 'next/router';

import {Avatar, Button, Typography} from '@mui/material';

import SwitchAccount from 'src/components/molecules/SwitchAccount';
import {formatAddress} from 'src/helpers/formatAddress';
import {useAuth} from 'src/hooks/use-auth.hook';
import {useInstances, InstanceType} from 'src/hooks/use-instances.hook';

import {IcDropdownPrimary, IcNotification} from '../../../../public/icons';

const PolkadotIcon = dynamic(() => import('@polkadot/react-identicon'), {
  ssr: false,
});

const Header = ({title}: {title: string}) => {
  const router = useRouter();
  const {cookie, logout} = useAuth();
  const accountId = cookie?.session?.currentAddress ?? '';
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const {servers, loading} = useInstances(InstanceType.OWNED, accountId);
  console.log('servers', servers, loading);

  const handleClickNotification = () => {
    router.push('/dashboard/notification');
  };

  const handleSignIn = () => {
    setAnchorEl(null);
  };

  const handleShowSwitchAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
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
            <div className="flex">
              <Avatar
                style={{height: 24, width: 24, marginRight: 6}}
                src="https://i.pravatar.cc/300"
                alt="profile"
              />
              <div className="w-[122px]">
                <Typography textAlign={'left'} color={'black'} fontSize={14}>
                  Cat
                </Typography>
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
        accountId={accountId}
        handleClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        openMenu={openMenu}
        handleLogout={logout}
        handleSwitchAccount={handleSignIn}
        leftButtonLabel={'Switch Instance'}
        rightButtonLabel={'Logout Instance'}
      />
    </div>
  );
};

export default Header;
