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
      streamingAPI.getAppData(
        appName,
        (message: WsServerMessage<ContainerStats>) => {
          const cpuDelta =
            message.data.cpu_stats.cpu_usage.total_usage -
            message.data.precpu_stats.cpu_usage.total_usage;
          const systemDelta =
            message.data.cpu_stats.system_cpu_usage -
            message.data.precpu_stats.system_cpu_usage;
          const RESULT_CPU_USAGE = (cpuDelta / systemDelta) * 100;
          console.log('cpuDelta', cpuDelta);
          console.log('systemDelta', systemDelta);
          console.log('RESULT_CPU_USAGE', RESULT_CPU_USAGE);
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
