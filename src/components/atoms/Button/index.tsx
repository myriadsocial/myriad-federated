import {Button as ButtonMui} from '@mui/material';
import {colors} from '../../../utils';

interface ButtonOutlineInterface {
  onClick: () => void;
  label: string;
  primary?: boolean;
  isFullWidth?: boolean;
  disable?: boolean;
}

const Button = ({
  label,
  primary,
  onClick,
  isFullWidth,
  disable,
  ...props
}: ButtonOutlineInterface) => {
  if (primary) {
    return (
      <ButtonMui
        onClick={disable ? undefined : onClick}
        style={{
          backgroundColor: colors.primary,
          borderRadius: 20,
          color: 'white',
          textTransform: 'capitalize',
        }}
        fullWidth={isFullWidth}
        {...props}>
        {label}
      </ButtonMui>
    );
  }
  return (
    <ButtonMui
      onClick={disable ? undefined : onClick}
      variant="outlined"
      style={{
        backgroundColor: disable ? '#EDEDED' : 'white',
        borderRadius: 20,
        color: disable ? '#C2C2C2' : 'black',
        borderColor: disable ? '#C2C2C2' : '#FFD24D',
        textTransform: 'capitalize',
      }}
      fullWidth={isFullWidth}
      {...props}>
      {label}
    </ButtonMui>
  );
};

export default Button;
