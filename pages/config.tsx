import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { PageHeader } from '../features/layout/PageHeader/PageHeader';

const Config: React.FunctionComponent = () => {
  return (
    <Fragment>
      <PageHeader title="Config" />
      <Typography>Dokku &amp; docker config</Typography>
    </Fragment>
  );
};

export default Config;
