import CopyToClipboard from 'react-copy-to-clipboard';

import Image from 'next/image';

import { IconButton, ListItemButton } from '@mui/material';

import { IcCopyOutline } from 'public/icons';

type type = 'switchAccount' | 'switchInstance' | 'listSwitchInstance';
interface ListSwitchAccount {
  type?: type;
  clickCopy?: () => void;
  onClick?: () => void;
  label: string | undefined;
  image: string;
}
export default function ListSwitchAccount(props: ListSwitchAccount) {
  const { type, clickCopy, label, onClick, image } = props;

  return (
    <div
      className={
        type === 'switchAccount'
          ? 'bg-[#EBE0FF] flex h-14 rounded-[4px] w-full justify-between items-center'
          : type === 'switchInstance'
          ? 'bg-[#EBE0FF] flex h-14 rounded-[4px] w-full justify-between items-center'
          : type === 'listSwitchInstance'
          ? 'bg-selected-yellow flex h-14 rounded-[4px] w-full justify-between items-center'
          : 'hover:bg-selected-yellow flex h-14 rounded-[4px] w-full justify-between items-center'
      }
    >
      <ListItemButton style={{ padding: 8, flex: 1 }} onClick={onClick}>
        <Image src={image} alt="" height={40} width={40} />
        <div style={{ fontSize: 16, marginLeft: 8, flex: 1 }}>{label}</div>
      </ListItemButton>
      {type === 'switchAccount' && (
        <CopyToClipboard text={label ?? ''}>
          <IconButton onClick={clickCopy} style={{ height: 40, width: 40 }}>
            <Image alt="" src={IcCopyOutline} />
          </IconButton>
        </CopyToClipboard>
      )}
    </div>
  );
}
