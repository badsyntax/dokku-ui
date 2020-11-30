import React, { Fragment, useState } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { CreateAppDialog } from '../CreateAppDialog/CreateAppDialog';

export const AppListPageActions: React.FunctionComponent = () => {
  const [createAppDialogOpen, setCreateAppDialogOpen] = useState<boolean>(
    false
  );
  const handleCreateAppButtonClick = () => {
    setCreateAppDialogOpen(true);
  };
  const handleCreateAppDialogClose = () => {
    setCreateAppDialogOpen(false);
  };
  return (
    <Fragment>
      <CreateAppDialog
        open={createAppDialogOpen}
        onClose={handleCreateAppDialogClose}
      />
      <Button
        variant="outlined"
        onClick={handleCreateAppButtonClick}
        startIcon={<AddIcon />}
      >
        Create App
      </Button>
    </Fragment>
  );
};
