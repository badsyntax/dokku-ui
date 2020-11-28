import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { PageHeader } from '../components/PageHeader/PageHeader';

const Home: React.FunctionComponent = () => {
  return (
    <Fragment>
      <PageHeader title="Dashboard" />
      <Typography>
        It'd be nice to show some stats here which include:
      </Typography>
      <ul>
        <li>
          Host system stats (disk usage, cpu usage, memory usage) - similar to
          mailinabox
        </li>
        <li>Dokku stats: eg running apps</li>
      </ul>
    </Fragment>
  );
};

export default Home;
