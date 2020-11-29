import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { App } from '../../../dokku/types';

export interface AppDetailProps {
  app: App;
}

export const AppDetail: React.FunctionComponent<AppDetailProps> = ({ app }) => {
  return (
    <Box>
      <Typography>Name: {app.name}</Typography>
    </Box>
  );
};
