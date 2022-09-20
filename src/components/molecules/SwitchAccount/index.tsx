import {Popover} from '@mui/material';

import ListSwitchAccount from 'src/components/atoms/ListSwithAccount';
import {formatAddress} from 'src/helpers/formatAddress';

import {IcAccountPolkadot} from 'public/icons';

import Button from '../../atoms/Button';

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
      style={{marginTop: 8}}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
      <div className="rounded-[10px] p-5 w-[360px]">
        <div className="text-sm font-semibold">{title}</div>
        <div className="mt-4">
          <div className="text-xs fonts-semibold mb-2">Logged in</div>
          <ListSwitchAccount
            image={type === 'switchAccount' ? IcAccountPolkadot : image}
            type={type}
            label={type === 'switchAccount' ? formatAddress(accountId as string) : accountId}
            onClick={handleClickCurrentAddress}
          />
        </div>
        <div className="flex mt-4 gap-2">
          <Button onClick={handleSwitchAccount} label={leftButtonLabel} isFullWidth />
          <Button onClick={handleLogout} label={rightButtonLabel} primary isFullWidth />
        </div>
      </div>
    </Popover>
  );
};

export default SwitchAccount;
