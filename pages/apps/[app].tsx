import React, { Fragment, useEffect, useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import { PageHeader } from '../../features/layout/PageHeader/PageHeader';
import { App } from '../../dokku/types';
import { AppDetail } from '../../features/apps/AppDetail/AppDetail';
import { DokkuClientError } from '../../features/layout/DokkuClientError/DokkuClientError';
import { WsServerMessage } from '../../api/types';
import { ContainerStats } from 'dockerode';

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
      const unsubscribe = streamingAPI.getAppData(
        appName,
        (message: WsServerMessage<ContainerStats>) => {
          // TODO: update state
        }
      );
      const { dokkuApi } = await import(
        /* webpackChunkName: 'DokkuAPI' */ '../../api/DokkuAPI'
      );
      dokkuApi
        .getApp(appName)
        .then(setApp, setError)
        .finally(() => setIsLoading(false));
    }
    fetchData();
    return () => {
      // FIXME: kill the stream
    };
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
