import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles } from './CodeBlock.styles';

export interface CodeBlockProps {
  language: string;
}

export const CodeBlock: React.FunctionComponent<CodeBlockProps> = ({
  children,
  language,
}) => {
  const classes = useStyles();
  return (
    <Typography component="pre" className={classes.root}>
      <Typography component="code" className={language}>
        {children}
      </Typography>
    </Typography>
  );
};
