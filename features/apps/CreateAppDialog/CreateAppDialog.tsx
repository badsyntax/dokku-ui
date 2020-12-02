/* eslint-disable jsx-a11y/no-autofocus */
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { Alert, Autocomplete } from '@material-ui/lab';
import React, { useRef, useState } from 'react';
import { useStyles } from './CreateAppDialog.styles';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { dokkuApi } from '../../../api/DokkuAPI';
export interface CreateAppDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
}

export const CreateAppDialog: React.FunctionComponent<CreateAppDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const classes = useStyles();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const formData = new FormData(formRef.current);
    dokkuApi
      .createApp(formData.get('name').toString())
      .then(
        () => {
          onClose();
          onCreate();
        },
        (e) => {
          setError(e.message);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="create-app-dialog-title"
      aria-describedby="create-app-dialog-description"
    >
      <form onSubmit={handleFormSubmit} ref={formRef}>
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
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Name"
            fullWidth
            autoFocus
            required
            margin="normal"
            variant="outlined"
            name="name"
            disabled={isLoading}
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
          <Button
            variant="outlined"
            onClick={onClose}
            startIcon={<CloseIcon />}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            startIcon={
              isLoading ? (
                <CircularProgress size={20} variant="indeterminate" />
              ) : (
                <CheckIcon />
              )
            }
            type="submit"
            disabled={isLoading}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
