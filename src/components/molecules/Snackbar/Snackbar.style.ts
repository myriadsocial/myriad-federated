import {makeStyles, Theme} from '@material-ui/core/styles';

import {VariantType} from 'notistack';

interface VariantProps {
  variant: VariantType;
}

export const useStyles = makeStyles<Theme, VariantProps>(theme => ({
  icons: {
    marginLeft: 'auto',
  },
  iconLeft: {
    marginRight: '12px',
    fill: props =>
      props?.variant === 'success'
        ? '#47B881'
        : props?.variant === 'error'
        ? '#FE3636'
        : props?.variant === 'warning'
        ? '#F0A200'
        : props?.variant === 'info'
        ? '#1070CA'
        : '#FFFFFF',
  },
  iconClose: {
    marginRight: '5px',
    marginLeft: '5px',
    fill: '#66788A',
  },
}));
