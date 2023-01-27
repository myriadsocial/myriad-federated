import { Popover } from '@mui/material';

import ListSwitchAccount from 'src/components/atoms/ListSwithAccount';
import { formatAddress } from 'src/helpers/formatAddress';

import { IcAccountPolkadot, IcMyriad, IcOpenUrl } from 'public/icons';

import Button from '../../atoms/Button';
import Image from 'next/image';

type type = 'switchAccount' | 'switchInstance';
interface SwitchAccountProps {
  anchorEl: null | HTMLElement;
  openMenu: boolean;
  handleLogout: () => void;
  handleClose: () => void;
  handleSwitchAccount: () => void;
  accountId: string | undefined;
  handleClickCurrentAddress?: () => void;
  leftButtonLabel: string;
  rightButtonLabel: string;
  type?: type;
  title: string;
  image?: string;
  currentBalance?: string;
  stakedBalance?: string;
}
const SwitchAccount = (props: SwitchAccountProps) => {
  const {
    accountId,
    anchorEl,
    openMenu,
    handleLogout,
    handleClose,
    handleSwitchAccount,
    handleClickCurrentAddress,
    leftButtonLabel,
    rightButtonLabel,
    type,
    title,
    image,
    currentBalance,
    stakedBalance,
  } = props;

  return (
    <Popover
      anchorEl={anchorEl}
      onClose={handleClose}
      open={openMenu}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      style={{ marginTop: 8 }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <div className="rounded-[10px] p-5 w-[360px]">
        <div className="text-sm font-semibold">{title}</div>
        <div className="mt-4">
          <ListSwitchAccount
            image={type === 'switchAccount' ? IcAccountPolkadot : image}
            type={type}
            label={
              type === 'switchAccount'
                ? formatAddress(accountId as string)
                : accountId
            }
            onClick={handleClickCurrentAddress}
          />
        </div>

        <div className="flex mt-4 gap-2 justify-between">
          <div className="text-sm font-semibold">My Balance</div>
        </div>

        <div className="flex mt-4 gap-2 ">
          <Image src={IcMyriad} height={20} width={20} alt="" />
          <div className="ml-1 text-sm font-semibold">
            {currentBalance ?? '123,456.789'} MYRIA
          </div>
        </div>
        <div className="my-4 flex flex-col gap-y-1">
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

        <div className="flex mt-4 gap-2 justify-between">
          <div className="text-sm font-semibold">Staked Balance</div>
        </div>

        <div className="flex mt-4 gap-2 ">
          <Image src={IcMyriad} height={20} width={20} alt="" />
          <div className="ml-1 text-sm font-semibold">
            {stakedBalance ?? '123,456.789'} MYRIA
          </div>
        </div>

        <div className="flex mt-4 gap-2">
          <Button
            onClick={handleSwitchAccount}
            label={leftButtonLabel}
            isFullWidth
          />
          <Button
            onClick={handleLogout}
            label={rightButtonLabel}
            primary
            isFullWidth
          />
        </div>
      </div>
    </Popover>
  );
};

export default SwitchAccount;
