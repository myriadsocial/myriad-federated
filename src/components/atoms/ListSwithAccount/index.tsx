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
    <div
      style={{
        display: 'flex',
        backgroundColor:
          type === 'switchAccount' ? '#EBE0FF' : type === 'switchInstance' ? '#FFC8574D' : 'white',
        height: 56,
        borderRadius: 4,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <ListItemButton style={{padding: 8, flex: 1}} onClick={onClick}>
        <Image src={image} alt="" height={40} width={40} />
        <div style={{fontSize: 16, marginLeft: 8, flex: 1}}>{label}</div>
      </ListItemButton>
      {type === 'switchAccount' && (
        <CopyToClipboard text={label ?? ''}>
          <IconButton onClick={clickCopy} style={{height: 40, width: 40}}>
            <Image alt="" src={IcCopyOutline} />
          </IconButton>
        </CopyToClipboard>
      )}
    </div>
  );
}
