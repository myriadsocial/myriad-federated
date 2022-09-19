import CopyToClipboard from 'react-copy-to-clipboard';

import Image from 'next/image';

import {IconButton, ListItemButton} from '@mui/material';

import {IcCopyOutline} from 'public/icons';

type type = 'switchAccount' | 'switchInstance';
interface ListSwitchAccount {
  type?: type;
  clickCopy?: () => void;
  onClick?: () => void;
  label: string | undefined;
  image: string;
}
export default function ListSwitchAccount(props: ListSwitchAccount) {
  const {type, clickCopy, label, onClick, image} = props;

  return (
    <div className={'bg-[#EBE0FF] h-14 rounded-[4px] flex items-center w-full'}>
      <ListItemButton style={{padding: 8}} onClick={onClick}>
        <Image src={image} alt="" height={40} width={40} />
        <div className="text-base flex-1 ml-2">{label}</div>
      </ListItemButton>
      {type === 'switchAccount' && (
        <CopyToClipboard text={label ?? ''}>
          <IconButton onClick={clickCopy}>
            <Image alt="" src={IcCopyOutline} />
          </IconButton>
        </CopyToClipboard>
      )}
    </div>
  );
}
