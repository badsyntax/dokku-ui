import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { PageHeader } from '../../features/layout/PageHeader/PageHeader';
import { dokkuApi } from '../../api/DokkuAPI';
import { AppsList } from '../../features/apps/AppsList/AppsList';
import { DokkuClientError } from '../../features/layout/DokkuClientError/DokkuClientError';
import { AppListPageActions } from '../../features/apps/AppListPageActions/AppListPageActions';
import { ProgressContext } from '../../features/layout/Progress/Progress';

const Apps: React.FunctionComponent = () => {
  const [apps, setApps] = useState<string[]>([]);
  const [error, setError] = useState<Error>(null);
  const {
    isVisible: isLoading,
    show: showProgress,
    hide: hideProgress,
  } = useContext(ProgressContext);

  useEffect(() => {
    showProgress();
    dokkuApi.getApps().then(setApps, setError).finally(hideProgress);
  }, [hideProgress, showProgress]);
  return (
    <Fragment>
      <PageHeader title="Apps" pageActions={<AppListPageActions />} />
      {isLoading && <Typography>Loading...</Typography>}
      {!isLoading && !error && <AppsList apps={apps} />}
      {!isLoading && error && <DokkuClientError error={error} />}
    </Fragment>
  );
};

export default Apps;
