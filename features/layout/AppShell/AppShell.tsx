import React from 'react';
import Image from 'next/image';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  LinearProgress,
} from '@material-ui/core';

import { useStyles } from './styles';
import { Sidebar } from '../Sidebar/Sidebar';

export const AppShell: React.FunctionComponent = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box mr={2}>
              <Image src="/logo.png" width="40" height="40" />
            </Box>
            <Typography component="h1" variant="h6" noWrap>
              Dokku UI
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Sidebar />
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};
