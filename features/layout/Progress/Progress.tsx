import React, { useCallback, useContext, useEffect, useState } from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';
import { theme } from '../../../theme/theme';

TopBarProgress.config({
  barColors: {
    0: theme.palette.secondary.main,
    '1.0': theme.palette.secondary.main,
  },
  shadowBlur: 5,
  shadowColor: 'rgba(0,0,0,0.5)',
  barThickness: 4,
});

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
  const [isVisible, setIsVisible] = useState(initialState.isVisible);
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
  useEffect(() => {
    document.body.style.cursor = isVisible ? 'progress' : 'default';
  }, [isVisible]);
  return isVisible ? <TopBarProgress /> : null;
};
