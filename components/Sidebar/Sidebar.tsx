import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import AirplayIcon from '@material-ui/icons/Airplay';
import SettingsInputHdmiIcon from '@material-ui/icons/SettingsInputHdmi';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Link from '../Link/Link';
import { useStyles } from './styles';

export const Sidebar: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.root}
      variant="permanent"
      classes={{
        paper: classes.paper,
      }}
    >
      <Toolbar />
      <div className={classes.container}>
        <List>
          <ListItem
            button
            key="dashboard"
            component={Link}
            href="/"
            naked
            activeClassName={classes.navActive}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            key="apps"
            component={Link}
            href="/apps"
            naked
            activeClassName={classes.navActive}
          >
            <ListItemIcon>
              <AirplayIcon />
            </ListItemIcon>
            <ListItemText primary="Apps" />
          </ListItem>
          <ListItem
            button
            key="plugins"
            component={Link}
            href="/plugins"
            naked
            activeClassName={classes.navActive}
          >
            <ListItemIcon>
              <SettingsInputHdmiIcon />
            </ListItemIcon>
            <ListItemText primary="Plugins" />
          </ListItem>
          <ListItem
            button
            key="config"
            component={Link}
            href="/config"
            naked
            activeClassName={classes.navActive}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Config" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};
