import {Popover} from '@mui/material';

import ListSwitchAccount from 'src/components/atoms/ListSwithAccount';

import Button from '../../atoms/Button';

interface SwitchAccountProps {
  anchorEl: null | HTMLElement;
  openMenu: boolean;
  handleLogout: () => void;
  handleClose: () => void;
  handleSwitchAccount: () => void;
  accountId: string | undefined;
}
const SwitchAccount = (props: SwitchAccountProps) => {
  const {anchorEl, openMenu, handleLogout, handleClose, handleSwitchAccount, accountId} = props;

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
        <div className="text-sm font-semibold">Account</div>
        <div className="mt-4">
          <div className="text-xs fonts-semibold mb-2">Logged in</div>
          <ListSwitchAccount type="myAddress" label={accountId} />
        </div>
        {/* <div>
          <div className="text-sm font-semibold my-4">Others</div>
          {data.map((item, index) => {
            return (
              <ListSwitchAccount
                key={index}
                onClick={() => handleClick(item)}
                type={selectedAccount.address === item.address && 'selectedAddress'}
                label={item.address}
              />
            );
          })}
        </div> */}
        <div className="flex mt-4 gap-2">
          <Button onClick={handleSwitchAccount} label="Switch Account" isFullWidth />
          <Button onClick={handleLogout} label="Disconnect" primary isFullWidth />
        </div>
      </div>
    </Popover>
  );
};

export default SwitchAccount;
