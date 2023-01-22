import { ReactNode } from 'react';

import { Button as ButtonMui } from '@mui/material';

import { colors } from '../../../utils';

interface ButtonOutlineInterface {
  onClick: any;
  label?: string | ReactNode;
  primary?: boolean;
  error?: boolean;
  isFullWidth?: boolean;
  disable?: boolean;
  type?: string;
  children?: ReactNode;
}

const Button = ({
  label,
  primary,
  error,
  onClick,
  isFullWidth,
  disable,
  type,
  children,
  ...props
}: ButtonOutlineInterface) => {
  if (type === 'text') {
    return (
      <ButtonMui
        variant="text"
        onClick={onClick}
        style={{
          textTransform: 'initial',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20,
          height: 40,
          borderRadius: 20,
          fontFamily: 'mulish',
          color: 'black',
        }}
      >
        {label}
      </ButtonMui>
    );
  }
  if (type === 'withChild') {
    return (
      <ButtonMui
        variant="contained"
        onClick={onClick}
        style={{
          height: 36,
          background: 'white',
          borderRadius: 36 / 2,
          width: 'auto',
          minHeight: 0,
          minWidth: 0,
          padding: 0,
          paddingRight: 10,
          paddingLeft: 10,
          fontFamily: 'mulish',
        }}
      >
        {children}
      </ButtonMui>
    );
  }
  if (primary) {
    return (
      <ButtonMui
        onClick={disable ? undefined : onClick}
        style={{
          paddingRight: 20,
          paddingLeft: 20,
          height: 40,
          backgroundColor: disable ? colors.backgroundGray : colors.primary,
          borderRadius: 20,
          color: disable ? colors.textGray : 'white',
          textTransform: 'capitalize',
          fontFamily: 'mulish',
        }}
        fullWidth={isFullWidth}
        {...props}
      >
        {label}
      </ButtonMui>
    );
  }
  if (error) {
    return (
      <ButtonMui
        onClick={disable ? undefined : onClick}
        style={{
          paddingRight: 20,
          paddingLeft: 20,
          height: 40,
          backgroundColor: disable ? colors.backgroundGray : colors.error,
          borderRadius: 20,
          color: disable ? colors.textGray : 'white',
          textTransform: 'capitalize',
          fontFamily: 'mulish',
        }}
        fullWidth={isFullWidth}
        {...props}
      >
        {label}
      </ButtonMui>
    );
  }
  return (
    <ButtonMui
      onClick={disable ? undefined : onClick}
      variant="outlined"
      style={{
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: disable ? '#EDEDED' : 'white',
        borderRadius: 20,
        color: disable ? '#C2C2C2' : 'black',
        borderColor: disable ? '#C2C2C2' : '#FFD24D',
        textTransform: 'capitalize',
        fontFamily: 'mulish',
      }}
      fullWidth={isFullWidth}
      {...props}
    >
      {label}
    </ButtonMui>
  );
};

export default Button;
