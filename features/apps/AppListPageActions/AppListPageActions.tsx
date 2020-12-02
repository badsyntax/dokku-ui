import React, { Fragment, useState } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { CreateAppDialog } from '../CreateAppDialog/CreateAppDialog';

export interface AppListPageActions {
  onAppCreate: () => void;
}

export const AppListPageActions: React.FunctionComponent<AppListPageActions> = ({
  onAppCreate,
}) => {
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
        onCreate={onAppCreate}
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
