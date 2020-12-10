import { Divider } from '@material-ui/core';
import React from 'react';
import { useStyles } from './SectionDivider.styles';

export const SectionDivider: React.FunctionComponent = () => {
  const classes = useStyles();
  return <Divider variant="fullWidth" className={classes.root} />;
};
