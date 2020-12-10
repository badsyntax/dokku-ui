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
import { useStyles } from './AddConfigVarDialog.styles';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { dokkuApi } from '../../../api/DokkuAPI';
import { ProgressButton } from '../../layout/ProgressButton/ProgressButton';
import { App } from '../../../dokku/types';

export interface AddConfigVarDialogProps {
  app: App;
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
}

export const AddConfigVarDialog: React.FunctionComponent<AddConfigVarDialogProps> = ({
  app,
  open,
  onClose,
  onCreate,
}) => {
  const [error, setError] = useState<string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const classes = useStyles();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const formData = new FormData(e.target);
    dokkuApi
      .addAppConfig(app.name, formData)
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
      aria-labelledby="app-add-config-var-dialog-title"
      aria-describedby="app-add-config-var-description"
    >
      <form onSubmit={handleFormSubmit}>
        <DialogTitle id="app-add-config-var-title">
          Add Environment Variable
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
            label="Key"
            fullWidth
            autoFocus
            required
            margin="normal"
            variant="outlined"
            name="key"
            placeholder="Key"
            disabled={isLoading}
          />

          <TextField
            label="Value"
            fullWidth
            required
            margin="normal"
            variant="outlined"
            name="value"
            placeholder="Value"
            disabled={isLoading}
            multiline
            rows={2}
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
          <ProgressButton
            showProgress={isLoading}
            variant="outlined"
            color="primary"
            startIcon={<CheckIcon />}
            type="submit"
            disabled={isLoading}
          >
            Save
          </ProgressButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
