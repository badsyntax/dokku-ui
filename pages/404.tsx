import { Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { PageHeader } from '../features/layout/PageHeader/PageHeader';

export default function Custom404() {
  return (
    <Fragment>
      <PageHeader title="404 Not Found" />
      <Typography>This page could not be found.</Typography>
    </Fragment>
  );
}
