import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { PageHeader } from '../components/PageHeader/PageHeader';

const Plugins: React.FunctionComponent = () => {
  return (
    <Fragment>
      <PageHeader title="Plugins" />
      <Typography>A list of dokku plugins</Typography>
    </Fragment>
  );
};

export default Plugins;
