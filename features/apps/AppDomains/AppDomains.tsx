import React from 'react';
import {
  Grid,
  Typography,
  List,
  ListItem,
  Link,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LanguageIcon from '@material-ui/icons/Language';
import AddIcon from '@material-ui/icons/Add';
import BlockIcon from '@material-ui/icons/Block';

import { App } from '../../../dokku/types';

export interface AppDomainsProps {
  app: App;
}

export const AppDomains: React.FunctionComponent<AppDomainsProps> = ({
  app,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Typography variant="h6">Global Virtual Hosts</Typography>
        {/* <Typography>
                  Enabled: {app.domains.globalEnabled.toString()}
                </Typography> */}
        <List component="nav">
          {app.domains?.globalVhosts.map((vhost) => {
            return (
              <ListItem button component={Link} href={vhost}>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary={vhost} />
              </ListItem>
            );
          })}
        </List>
        <Button variant="outlined" startIcon={<AddIcon />}>
          Add host
        </Button>{' '}
        {app.domains?.globalEnabled && (
          <Button variant="outlined" startIcon={<BlockIcon />}>
            Disable
          </Button>
        )}
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6" gutterBottom>
          Virtual Hosts
        </Typography>
        {/* <Typography>
                  Enabled: {app.domains.enabled.toString()}
                </Typography> */}
        {!app.domains?.vhosts.length && (
          <Alert severity="info">No virtual hosts</Alert>
        )}
        <List component="nav">
          {app.domains?.vhosts.map((vhost) => {
            return (
              <ListItem button component={Link} href={vhost}>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary={vhost} />
              </ListItem>
            );
          })}
        </List>
        <Button variant="outlined" startIcon={<AddIcon />}>
          Add host
        </Button>{' '}
        {app.domains?.enabled && (
          <Button variant="outlined" startIcon={<BlockIcon />}>
            Disable
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
