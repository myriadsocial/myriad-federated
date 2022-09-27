import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from '@heroicons/react/solid';

import React from 'react';

import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

import {SnackbarContent, useSnackbar} from 'notistack';

import {SnackbarProps} from './Snackbar.interface';
import {useStyles} from './Snackbar.style';

export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>((props, ref) => {
  const style = useStyles(props);

  const {closeSnackbar} = useSnackbar();
  const dismiss = () => closeSnackbar(props.key);

  return (
    <SnackbarContent ref={ref} className="max-w-[600px]">
      <div
        className={
          props?.variant === 'success'
            ? 'bg-[#47B881] h-[60px] w-full pl-2 rounded-[10px]'
            : props?.variant === 'error'
            ? 'bg-[#FE3636] h-[60px] w-full pl-2 rounded-[10px]'
            : props?.variant === 'warning'
            ? 'bg-[#F0A200] h-[60px] w-full pl-2 rounded-[10px]'
            : props?.variant === 'info'
            ? 'bg-[#1070CA] h-[60px] w-full pl-2 rounded-[10px]'
            : 'bg-[#FFFFFF] h-[60px] w-full pl-2 rounded-[10px]'
        }>
        <div className="bg-white w-full h-full rounded-r-[10px] rouded-br-[10px] flex items-center pl-4">
          <SvgIcon
            classes={{root: style.iconLeft}}
            component={
              props?.variant === 'success'
                ? CheckCircleIcon
                : props?.variant === 'error'
                ? ExclamationCircleIcon
                : props?.variant === 'warning'
                ? ExclamationIcon
                : props?.variant === 'info'
                ? InformationCircleIcon
                : QuestionMarkCircleIcon
            }
            viewBox="0 0 20 20"
          />
          <div className="text-sm">{props.message}</div>
          <div className={style.icons}>
            <IconButton aria-label="close" onClick={dismiss}>
              <SvgIcon
                component={XIcon}
                viewBox="0 0 20 20"
                classes={{root: style.iconClose}}
                color="inherit"
              />
            </IconButton>
          </div>
        </div>
      </div>
    </SnackbarContent>
  );
});

Snackbar.displayName = 'Snackbar';
