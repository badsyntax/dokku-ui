import React, { useCallback, useContext, useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import { useStyles } from './Progress.styles';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (): void => {};

export interface ProgressContext {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
}

const initialState = {
  isVisible: false,
  show: noop,
  hide: noop,
};

export const ProgressContext = React.createContext<ProgressContext>(
  initialState
);

export const ProgressProvider: React.FunctionComponent = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);
  return (
    <ProgressContext.Provider value={{ isVisible, show, hide }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const Progress: React.FunctionComponent = () => {
  const { isVisible } = useContext(ProgressContext);
  const classes = useStyles();
  return isVisible && <LinearProgress className={classes.root} />;
};
