import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1000,
      color: '#fff',
    },
  }),
);
