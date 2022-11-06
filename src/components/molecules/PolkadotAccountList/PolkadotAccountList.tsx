import React from 'react';

import dynamic from 'next/dynamic';

import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import { Button, ListItemButton } from '@mui/material';
import { Modal } from '../../atoms/Modal';
import { AllignTitle } from '../../atoms/Modal/Modal.types';
import { PolkadotLink } from '../common/PolkadotLink.component';
import ShowIf from '../common/show-if.component';

type PolkadotAccountListProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (account: InjectedAccountWithMeta) => void;
  accounts: InjectedAccountWithMeta[];
  title?: string;
  align?: AllignTitle;
};

export const PolkadotAccountList: React.FC<PolkadotAccountListProps> = ({
  isOpen,
  accounts,
  onSelect,
  onClose,
  title,
  align,
}) => {
  const IdenticonWithoutSSR = dynamic(
    () => import('@polkadot/react-identicon'),
    {
      ssr: false,
    },
  );

  return (
    <Modal
      title={title ?? 'Account List'}
      open={isOpen}
      onClose={onClose}
      align={align ?? 'center'}
    >
      <div className="w-[380px]">
        <ShowIf condition={accounts.length == 0}>
          <div className="p-1 text-center max-w-[390px] ml-auto mr-auto text-base font-semibold">
            Please open your&nbsp;
            <PolkadotLink />
            &nbsp;extension and create new account or import existing.Then
            reload this page.
          </div>

          <div className="w-full py-2 flex flex-wrap justify-between">
            <Button
              variant="contained"
              size="medium"
              fullWidth
              style={{
                padding: 8,
                borderRadius: 20,
                fontFamily: 'mulish',
                textTransform: 'capitalize',
                backgroundColor: '#BCBCBC',
                fontSize: 14,
              }}
            >
              <div>Watch Tutorial Video</div>
            </Button>
          </div>
        </ShowIf>
        <ShowIf condition={accounts.length > 0}>
          <div className="mb-4">
            {accounts.map((account) => {
              return (
                <button
                  onClick={() => onSelect(account)}
                  key={account.address}
                  className="hover:bg-selected-yellow flex w-[360px] p-2 overflow-hidden items-center"
                >
                  <IdenticonWithoutSSR
                    value={account.address}
                    size={48}
                    theme="polkadot"
                  />
                  <div className="ml-2">
                    <div className="text-sm text-left text-[#0A0A0A]">
                      {account.meta.name}
                    </div>
                    <div className="max-w-sm text-left text-xs text-[#616161]">
                      {account.address}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </ShowIf>
      </div>
    </Modal>
  );
};

export default PolkadotAccountList;
