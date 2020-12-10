import { Button, ButtonProps, CircularProgress } from '@material-ui/core';
import React from 'react';

export interface ProgressButtonProps {
  showProgress: boolean;
}

export const ProgressButton: React.FunctionComponent<
  ProgressButtonProps & ButtonProps
> = ({ showProgress, startIcon, ...rest }) => {
  return (
    <Button
      variant="outlined"
      startIcon={
        showProgress ? (
          <CircularProgress size={20} variant="indeterminate" />
        ) : (
          startIcon
        )
      }
      {...rest}
    />
  );
};
