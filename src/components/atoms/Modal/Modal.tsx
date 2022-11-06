import React from 'react';

import ShowIf from 'src/components/molecules/common/show-if.component';

import { Dialog, DialogProps, IconButton } from '@mui/material';
import { AllignTitle, TitleSize } from './Modal.types';
import Image from 'next/image';
import { IcClosePurple } from 'public/icons';

export type ModalProps = DialogProps & {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  children: React.ReactNode;
  align?: AllignTitle;
  titleSize?: TitleSize;
  gutter?: 'none' | 'default' | 'custom';
  onClose: () => void;
};

export const Modal: React.FC<ModalProps> = (props) => {
  const {
    title,
    subtitle,
    children,
    onClose,
    align = 'center',
    titleSize = 'medium',
    gutter = 'default',
    className,
    fullScreen,
    ...otherProps
  } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      {...otherProps}
      fullScreen={fullScreen}
      disableEnforceFocus
      PaperProps={{ style: { borderRadius: 10 } }}
    >
      <ShowIf condition={!fullScreen}>
        <div className="items-center">
          <div className="p-7 text-xl font-bold">{title}</div>
          {subtitle &&
          (typeof subtitle === 'string' || subtitle instanceof String) ? (
            <div className="text-base">{subtitle}</div>
          ) : (
            <>{subtitle}</>
          )}
          <IconButton
            aria-label="close"
            size="small"
            style={{
              position: 'absolute',
              right: 30,
              top: 30,
              fill: 'currentcolor',
              width: 30,
              height: 30,
            }}
            onClick={onClose}
          >
            <Image src={IcClosePurple} height={20} width={20} alt="" />
          </IconButton>
        </div>
      </ShowIf>

      <div className="px-4 py-2"> {children} </div>
    </Dialog>
  );
};
