import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useStyles } from './styles';
import { AppActions } from '../AppsList/AppActions';
import { App } from '../../../dokku/types';

export interface AppDetailPageActionsProps {
  app: App;
}

export const AppDetailPageActions: React.FunctionComponent<AppDetailPageActionsProps> = ({
  app,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const resetAnchorEl = () => setAnchorEl(null);

  return (
    <Box className={classes.root}>
      <AppActions
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        app={app.name}
        resetAnchorEl={resetAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      />
      <Button
        variant="outlined"
        startIcon={<StopIcon />}
        disabled={!app.processReport?.running}
      >
        Stop
      </Button>
      <Button
        variant="outlined"
        startIcon={<PlayArrowIcon />}
        disabled={app.processReport?.running || !app.processReport?.deployed}
      >
        Start
      </Button>
      <Button
        variant="outlined"
        startIcon={<SettingsIcon />}
        onClick={handleMenuClick}
      >
        Actions
      </Button>
    </Box>
  );
};
