import React, { useState } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from '../../layout/Link/Link';
import { useStyles } from './styles';
import { AppActions } from './AppActions';

export interface AppsListProps {
  apps: string[];
}

export const AppsList: React.FunctionComponent<AppsListProps> = ({ apps }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedApp, setSelectedApp] = useState<string>(null);

  const handleMenuClick = (app: string) => (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setSelectedApp(app);
    setAnchorEl(event.currentTarget);
  };

  const resetAnchorEl = () => setAnchorEl(null);

  return (
    <TableContainer component={Paper}>
      <AppActions
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        app={selectedApp}
        resetAnchorEl={resetAnchorEl}
      />
      <Table aria-label="Apps">
        <TableHead>
          <TableRow>
            <TableCell>App Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apps.map((app) => (
            <TableRow key={app}>
              <TableCell component="th" scope="row">
                <Typography>
                  <Link href={`/apps/${app}`}>{app}</Link>
                </Typography>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleMenuClick(app)}
                  className={classes.menuButton}
                >
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
