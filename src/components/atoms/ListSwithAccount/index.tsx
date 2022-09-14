import CopyToClipboard from 'react-copy-to-clipboard';

import Image from 'next/image';

import {IconButton, ListItemButton} from '@mui/material';

import {formatAddress} from 'src/helpers/formatAddress';

import {IcAccountPolkadot, IcCopyOutline} from 'public/icons';

type type = 'myAddress' | 'selectedAddress';
interface ListSwitchAccount {
  type?: type;
  clickCopy?: () => void;
  onClick?: () => void;
  label: string | undefined;
}
export default function ListSwitchAccount(props: ListSwitchAccount) {
  const {type, clickCopy, label, onClick} = props;

  return (
    <div
      className={
        type === 'myAddress'
          ? 'bg-[#EBE0FF] h-14 rounded-[4px] flex items-center w-full'
          : type === 'selectedAddress'
          ? 'bg-selected-yellow h-14 rounded-[4px] flex items-center w-full'
          : 'h-14 rounded-[4px] flex items-center w-full'
      }>
      <ListItemButton style={{padding: 8}} onClick={onClick}>
        <Image src={IcAccountPolkadot} alt="" height={40} width={40} />
        <div className="text-base flex-1 ml-2">{formatAddress(label as string)}</div>
      </ListItemButton>
      {type === 'myAddress' && (
        <CopyToClipboard text={label ?? ''}>
          <IconButton onClick={clickCopy}>
            <Image alt="" src={IcCopyOutline} />
          </IconButton>
        </CopyToClipboard>
      )}
    </div>
  );
}
