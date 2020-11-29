import React, { Fragment, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { PageHeader } from '../../features/layout/PageHeader/PageHeader';
import { dokkuApi } from '../../api/DokkuAPI';
import { AppsList } from '../../features/apps/AppsList/AppsList';
import { DokkuClientError } from '../../features/layout/DokkuClientError/DokkuClientError';

const Apps: React.FunctionComponent = () => {
  const [apps, setApps] = useState<string[]>([]);
  const [error, setError] = useState<Error>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    dokkuApi
      .getApps()
      .then(setApps, setError)
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <Fragment>
      <PageHeader title="Apps" />
      {isLoading && <CircularProgress />}
      {!isLoading && !error && <AppsList apps={apps} />}
      {!isLoading && error && <DokkuClientError error={error} />}
    </Fragment>
  );
};

export default Apps;
