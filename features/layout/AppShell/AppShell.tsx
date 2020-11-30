import React from 'react';
import Image from 'next/image';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';

import { useStyles } from './AppShell.styles';
import { Sidebar } from '../Sidebar/Sidebar';
import { Progress, ProgressProvider } from '../Progress/Progress';

export const AppShell: React.FunctionComponent = ({ children }) => {
  const classes = useStyles();

  return (
    <ProgressProvider>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Progress />
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
    </ProgressProvider>
  );
};
