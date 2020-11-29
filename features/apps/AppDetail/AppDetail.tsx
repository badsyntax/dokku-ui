import React from 'react';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { App } from '../../../dokku/types';
import { useStyles } from './styles';

export interface AppDetailProps {
  app: App;
}

export const AppDetail: React.FunctionComponent<AppDetailProps> = ({ app }) => {
  const classes = useStyles();
  return (
    <Box>
      <Grid className={classes.grid} container spacing={3}>
        <Grid item xs={6} md={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6">CPU</Typography>
            <Typography>0.5%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Memory</Typography>
            <Typography> 2.113MiB / 1.941GiB (0.11%)</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Net I/O</Typography>
            <Typography>1.53kB / 0B</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Block I/O</Typography>
            <Typography>7.97MB / 0B</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Typography>Name: {app.name}</Typography>
    </Box>
  );
};
