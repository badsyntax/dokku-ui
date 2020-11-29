import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 260;

export const useStyles = makeStyles((theme) => ({
  root: {
    width: drawerWidth,
    flexShrink: 0,
  },
  paper: {
    width: drawerWidth,
  },
  container: {
    overflow: 'auto',
  },
  navActive: {
    backgroundColor: theme.palette.action.selected,
  },
}));
