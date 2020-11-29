import React, { Fragment, useEffect, useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { PageHeader } from '../../features/layout/PageHeader/PageHeader';
import { dokkuApi } from '../../api/DokkuAPI';
import { AppsList } from '../../features/apps/AppsList/AppsList';
import { DokkuClientError } from '../../features/layout/DokkuClientError/DokkuClientError';
import AddIcon from '@material-ui/icons/Add';

const Apps: React.FunctionComponent = () => {
  const [apps, setApps] = useState<string[]>([]);
  const [error, setError] = useState<Error>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const createApp = () => {
    alert('create app');
  };
  useEffect(() => {
    dokkuApi
      .getApps()
      .then(setApps, setError)
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <Fragment>
      <PageHeader
        title="Apps"
        pageActions={[
          <Button
            variant="contained"
            onClick={createApp}
            startIcon={<AddIcon />}
          >
            Create App
          </Button>,
        ]}
      />
      {isLoading && <CircularProgress />}
      {!isLoading && !error && <AppsList apps={apps} />}
      {!isLoading && error && <DokkuClientError error={error} />}
    </Fragment>
  );
};

export default Apps;
