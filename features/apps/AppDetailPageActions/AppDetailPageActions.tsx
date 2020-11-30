import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useStyles } from './styles';
import { AppActions } from '../AppsList/AppActions';
import { App } from '../../../dokku/types';

export interface AppDetailPageActionsProps {
  app: string;
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
      <AppActions anchorEl={anchorEl} app={app} resetAnchorEl={resetAnchorEl} />
      <Button variant="outlined" startIcon={<StopIcon />}>
        Stop
      </Button>
      <Button variant="outlined" startIcon={<PlayArrowIcon />} disabled>
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
