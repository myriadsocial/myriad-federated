import {makeStyles, Theme} from '@material-ui/core/styles';
import {createStyles} from '@mui/material';

export const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1000,
      color: '#fff',
    },
  }),
);
