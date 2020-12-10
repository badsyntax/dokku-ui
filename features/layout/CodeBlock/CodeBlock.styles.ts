import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2),
    margin: 0,
    '& code': {
      fontFamily: 'monospace',
      fontSize: theme.typography.fontSize,
    },
  },
}));
