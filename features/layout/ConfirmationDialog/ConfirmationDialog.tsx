/* eslint-disable jsx-a11y/no-autofocus */
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import React from 'react';

export interface ConfirmationDialogProps {
  title: string;
  message: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmationDialog: React.FunctionComponent<ConfirmationDialogProps> = ({
  title,
  message,
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="confirm-alert-dialog-title"
        aria-describedby="confirm-alert-dialog-description"
      >
        <DialogTitle id="confirm-alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained">
            No
          </Button>
          <Button
            onClick={onConfirm}
            color="primary"
            autoFocus
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};