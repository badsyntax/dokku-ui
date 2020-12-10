import React, { Fragment } from 'react';
import { Typography, Box, Button, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import { App } from '../../../dokku/types';

export interface AppVolumesProps {
  app: App;
}

export const AppVolumes: React.FunctionComponent<AppVolumesProps> = ({
  app,
}) => {
  return (
    <Grid container spacing={10}>
      <Grid item xs={4}>
        <Typography variant="h6" gutterBottom>
          Volumes
        </Typography>
        <Typography>
          Volumes are mounted directories used for persistent storage.
        </Typography>
      </Grid>
      <Grid item xs={8}>
        {!app.storage?.length && (
          <Box mb={2}>
            <Alert severity="info">No volumes</Alert>
          </Box>
        )}
        {!!app.storage?.length && (
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
        )}
        <Button variant="outlined" startIcon={<AddIcon />}>
          Add Volume
        </Button>
      </Grid>
    </Grid>
  );
};
