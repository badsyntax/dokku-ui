import React, { Fragment, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import { PageHeader } from '../../features/layout/PageHeader/PageHeader';
import { dokkuApi } from '../../api/DokkuAPI';
import { App } from '../../dokku/types';
import { AppDetail } from '../../features/apps/AppDetail/AppDetail';
import { DokkuClientError } from '../../features/layout/DokkuClientError/DokkuClientError';

const Apps: React.FunctionComponent = () => {
  const [app, setApp] = useState<App>(null);
  const [error, setError] = useState<Error>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { app: appName } = router.query;

  const pageTitle = error?.message || app?.name;

  useEffect(() => {
    if (appName && !Array.isArray(appName)) {
      setIsLoading(true);
      dokkuApi
        .getApp(appName)
        .then(setApp, setError)
        .finally(() => setIsLoading(false));
    }
  }, [appName]);

  return (
    <Fragment>
      <PageHeader title={pageTitle} />
      {isLoading && <CircularProgress />}
      {!isLoading && app && <AppDetail app={app} />}
      {!isLoading && error && <DokkuClientError error={error} />}
    </Fragment>
  );
};

export default Apps;
