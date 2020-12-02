import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  grid: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
  paperText: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  alertsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));
