/* eslint-disable jsx-a11y/no-autofocus */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { useStyles } from './CreateAppDialog.styles';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
export interface CreateAppDialogProps {
  open: boolean;
  onClose: () => void;
}

export const CreateAppDialog: React.FunctionComponent<CreateAppDialogProps> = ({
  open,
  onClose,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="create-app-dialog-title"
      aria-describedby="create-app-dialog-description"
    >
      <DialogTitle id="create-app-dialog-title">
        Create App
        <IconButton
          aria-label="close"
          onClick={onClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        <TextField
          label="Name"
          fullWidth
          autoFocus
          required
          margin="normal"
          variant="outlined"
        />
        {/* <Autocomplete
          freeSolo
          options={['image:version']}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Image"
              fullWidth
              margin="normal"
              variant="outlined"
              helperText="Optionally enter a local or remote image to use for this app"
            />
          )}
        /> */}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} startIcon={<CloseIcon />}>
          Cancel
        </Button>
        <Button variant="outlined" startIcon={<CheckIcon />}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
