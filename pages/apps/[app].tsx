import React, { Fragment, useEffect, useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import { PageHeader } from '../../features/layout/PageHeader/PageHeader';
import { App } from '../../dokku/types';
import { AppDetail } from '../../features/apps/AppDetail/AppDetail';
import { DokkuClientError } from '../../features/layout/DokkuClientError/DokkuClientError';
import { ServerMessage } from '../../ws/types';

const Apps: React.FunctionComponent = () => {
  const [app, setApp] = useState<App>(null);
  const [error, setError] = useState<Error>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { app: appName } = router.query;

  const pageTitle = error?.message || app?.name;

  useEffect(() => {
    async function fetchData() {
      if (!appName || Array.isArray(appName)) {
        return;
      }
      setIsLoading(true);
      const { streamingAPI } = await import(
        /* webpackChunkName: 'StreamingApi' */ '../../api/SteamingAPI'
      );
      streamingAPI.getAppData(appName, (message: ServerMessage) => {
        console.log('got server message', message.data);
      });
      const { dokkuApi } = await import(
        /* webpackChunkName: 'DokkuAPI' */ '../../api/DokkuAPI'
      );
      dokkuApi
        .getApp(appName)
        .then(setApp, setError)
        .finally(() => setIsLoading(false));
    }
    fetchData();
  }, [appName]);

  return (
    <Fragment>
      <PageHeader
        title={pageTitle}
        section={{
          title: 'Apps',
          url: '/apps',
        }}
        pageActions={[<Button variant="contained">Actions</Button>]}
      />
      {isLoading && <CircularProgress />}
      {!isLoading && app && <AppDetail app={app} />}
      {!isLoading && error && <DokkuClientError error={error} />}
    </Fragment>
  );
};

export default Apps;
