import React from 'react';
import Alert from '@material-ui/lab/Alert';

export interface DokkuClientError {
  error: Error;
}

export const DokkuClientError: React.FunctionComponent<DokkuClientError> = ({
  error,
}) => {
  return <Alert severity="error">{error.message}</Alert>;
};
