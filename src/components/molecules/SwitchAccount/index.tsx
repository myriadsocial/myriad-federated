import Image from 'next/image';

import {IconButton, ListItemButton, Popover} from '@mui/material';

import {formatAddress} from 'src/helpers/formatAddress';

import {IcAccountPolkadot, IcCopyOutline} from 'public/icons';

import Button from '../../atoms/Button';

interface SwitchAccountProps {
  anchorEl: null | HTMLElement;
  openMenu: boolean;
  handleLogout: () => void;
  handleClose: () => void;
}
const SwitchAccount = (props: SwitchAccountProps) => {
  const {anchorEl, openMenu, handleLogout, handleClose} = props;

  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const openMenu = Boolean(anchorEl);

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
          <div className="bg-[#EBE0FF] h-14 rounded-[4px] flex items-center w-full">
            <ListItemButton style={{padding: 8}} onClick={() => console.log('list click')}>
              <Image src={IcAccountPolkadot} alt="" height={40} width={40} />
              <div className="text-base flex-1 ml-2"> accountId</div>
            </ListItemButton>
            <IconButton onClick={() => console.log('copy click')}>
              <Image alt="" src={IcCopyOutline} />
            </IconButton>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold my-4">Others</div>
          <div className="bg-selected-yellow h-14 rounded-[4px] flex items-center p-2">
            <Image src={IcAccountPolkadot} alt="" height={40} width={40} />
            <div className="text-base flex-1">accountId</div>
            <IconButton onClick={() => console.log('copy click')}>
              <Image alt="" src={IcCopyOutline} />
            </IconButton>
          </div>
          <div className="h-14 rounded-[4px] flex items-center p-2">
            <Image src={IcAccountPolkadot} alt="" height={40} width={40} />
            <div className="text-base flex-1"> {formatAddress('accountId')}</div>
            <IconButton>
              <Image alt="" src={IcCopyOutline} />
            </IconButton>
          </div>
        </div>
        <div className="flex mt-4 gap-2">
          <Button onClick={undefined} label="Switch Account" isFullWidth />
          <Button onClick={handleLogout} label="Disconnect" primary isFullWidth />
        </div>
      </div>
    </Popover>
  );
};

export default SwitchAccount;
