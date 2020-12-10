import React from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  Tab,
  Tabs,
  Divider,
  Typography,
  AppBar,
} from '@material-ui/core';
import { App } from '../../../dokku/types';
import { useStyles } from './AppDetail.styles';
import { Alert } from '@material-ui/lab';
import BackupIcon from '@material-ui/icons/Backup';
import { AppDomains } from '../AppDomains/AppDomains';
import { AppVolumes } from '../AppVolumes/AppVolumes';
import { AppConfig } from '../AppConfig/AppConfig';
import { AppDeploy } from '../AppDeploy/AppDeploy';
import { SectionDivider } from '../../layout/SectionDivider/SectionDivider';
export interface AppDetailProps {
  app: App;
  onReloadApp: () => void;
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

export const AppDetail: React.FunctionComponent<AppDetailProps> = ({
  app,
  onReloadApp,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Box mb={2} className={classes.alertsContainer}>
        {app.processReport?.running && app.processReport?.deployed && (
          <Alert severity="success">This app is running</Alert>
        )}
        {!app.processReport?.running && app.processReport?.deployed && (
          <Alert severity="warning">This app is not running</Alert>
        )}
        {!app.processReport?.deployed && (
          <Alert
            severity="warning"
            action={
              <Button
                size="small"
                variant="outlined"
                startIcon={<BackupIcon />}
              >
                Setup Deployment
              </Button>
            }
          >
            This app is not deployed.
          </Alert>
        )}
      </Box>
      {app.processReport?.running && (
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
      )}

      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        scrollButtons="auto"
        variant="fullWidth"
      >
        <Tab label="Overview" {...a11yProps(0)} />
        <Tab label="Domains" {...a11yProps(1)} />
        <Tab label="Network" {...a11yProps(2)} />
        <Tab label="Settings" {...a11yProps(3)} />
        <Tab label="Deploy" {...a11yProps(3)} />
        <Tab label="Logs" {...a11yProps(4)} />
      </Tabs>
      <br />
      <Paper>
        <Box pl={3} pr={3} pb={3} pt={2}>
          <TabPanel value={value} index={0}>
            Overview
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AppDomains app={app} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Network
            <Typography variant="h5">Ports</Typography>
            <ul>
              {app.proxyPorts?.map((portMap) => {
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
          <TabPanel value={value} index={3}>
            <AppVolumes app={app} />
            <SectionDivider />
            <AppConfig app={app} onAddConfigVar={onReloadApp} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <AppDeploy app={app} />
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  );
};
