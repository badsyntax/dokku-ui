import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { App } from '../../../dokku/types';
import { useStyles } from './AppDetail.styles';
import { Alert } from '@material-ui/lab';

export interface AppDetailProps {
  app: App;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box pt={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const AppDetail: React.FunctionComponent<AppDetailProps> = ({ app }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Box mb={2}>
        <Alert severity="success">This app is running</Alert>
      </Box>
      <Grid className={classes.grid} container spacing={3}>
        <Grid item xs={6} md={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6">CPU</Typography>
            <Typography className={classes.paperText}>0.5%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Memory</Typography>
            <Typography className={classes.paperText}>
              2.113MiB / 1.941GiB (0.11%)
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Net I/O</Typography>
            <Typography className={classes.paperText}>1.53kB / 0B</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Block I/O</Typography>
            <Typography className={classes.paperText}>7.97MB / 0B</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Paper>
        <Box pl={3} pr={3} pb={3} pt={2}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollButtons="auto"
          >
            <Tab label="Storage Volumes" {...a11yProps(0)} />
            <Tab label="Domains" {...a11yProps(1)} />
            <Tab label="Proxy" {...a11yProps(2)} />
            <Tab label="Network" {...a11yProps(2)} />
            <Tab label="Logs" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Typography variant="h5">Volumes</Typography>
            <ul>
              {app.storage.map((storageVolume) => {
                return (
                  <li key={storageVolume.host + storageVolume.container}>
                    <Typography>
                      {storageVolume.host}:{storageVolume.container}
                    </Typography>
                  </li>
                );
              })}
            </ul>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid className={classes.grid} container spacing={3}>
              <Grid item xs={6}>
                <Typography variant="h6">Virtual Hosts</Typography>
                <Typography>
                  Enabled: {app.domains.enabled.toString()}
                </Typography>
                <ul>
                  {app.domains.vhosts.map((vhost) => {
                    return (
                      <li key={vhost}>
                        <Typography>{vhost}</Typography>
                      </li>
                    );
                  })}
                </ul>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Global Virtual Hosts</Typography>
                <Typography>
                  Enabled: {app.domains.globalEnabled.toString()}
                </Typography>
                <ul>
                  {app.domains.globalVhosts.map((vhost) => {
                    return (
                      <li key={vhost}>
                        <Typography>{vhost}</Typography>
                      </li>
                    );
                  })}
                </ul>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography variant="h5">Ports</Typography>
            <ul>
              {app.proxyPorts.map((portMap) => {
                const key =
                  portMap.scheme +
                  ':' +
                  portMap.hostPort +
                  ':' +
                  portMap.containerPort;
                return (
                  <li key={key}>
                    <Typography>{key}</Typography>
                  </li>
                );
              })}
            </ul>
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  );
};
