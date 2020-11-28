import { Box, Typography } from '@material-ui/core';
import Head from 'next/head';
import React, { Fragment } from 'react';

export interface PageHeaderProps {
  title: string;
}

export const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
  title,
}) => {
  return (
    <Fragment>
      <Head>
        <title>Dokku UI - {title}</title>
      </Head>
      <Box marginBottom={4}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
      </Box>
    </Fragment>
  );
};
