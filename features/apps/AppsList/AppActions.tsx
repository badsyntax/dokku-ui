import { Menu, MenuItem } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { ConfirmationDialog } from '../../layout/ConfirmationDialog/ConfirmationDialog';
import { CreateAppDialog } from '../CreateAppDialog/CreateAppDialog';

export enum Actions {
  destroy,
  rename,
  clone,
  lock,
}

export interface AppActionsProps {
  app: string;
  anchorEl: HTMLElement;
  resetAnchorEl: () => void;
}

const menuItems = [
  { name: 'Rename', action: Actions.rename },
  { name: 'Clone', action: Actions.clone },
  { name: 'Lock', action: Actions.lock },
  { name: 'Destroy', action: Actions.destroy },
];

export const AppActions: React.FunctionComponent<AppActionsProps> = ({
  app,
  anchorEl,
  resetAnchorEl,
}) => {
  const [action, setAction] = useState<Actions>(null);

  const handleActionsMenuItemClick = (action: Actions) => () => {
    setAction(action);
    resetAnchorEl();
  };

  const resetAction = () => {
    setAction(null);
    resetAnchorEl();
  };

  const destroyApp = () => {
    alert('destroy app');
    resetAction();
  };

  return (
    <Fragment>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={resetAction}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            onClick={handleActionsMenuItemClick(item.action)}
            key={item.action}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
      <ConfirmationDialog
        title="Please Confirm"
        message={`Are you sure you want to destroy the app '${app}'?`}
        open={action === Actions.destroy}
        onClose={resetAction}
        onConfirm={destroyApp}
      />
    </Fragment>
  );
};
