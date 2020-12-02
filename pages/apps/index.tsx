import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { PageHeader } from '../../features/layout/PageHeader/PageHeader';
import { dokkuApi } from '../../api/DokkuAPI';
import { AppsList } from '../../features/apps/AppsList/AppsList';
import { DokkuClientError } from '../../features/layout/DokkuClientError/DokkuClientError';
import { AppListPageActions } from '../../features/apps/AppListPageActions/AppListPageActions';
import { ProgressContext } from '../../features/layout/Progress/Progress';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Apps: React.FunctionComponent = () => {
  const [apps, setApps] = useState<string[]>([]);
  const [appCreateMessageOpen, setAppCreateMessageOpen] = useState<boolean>(
    false
  );
  const [error, setError] = useState<Error>(null);
  const { show: showProgress, hide: hideProgress } = useContext(
    ProgressContext
  );

  const loadData = useCallback(() => {
    showProgress();
    dokkuApi.getApps().then(setApps, setError).finally(hideProgress);
  }, [hideProgress, showProgress]);

  const handleAppCreate = () => {
    setAppCreateMessageOpen(true);
    loadData();
  };

  const handleAppCreateMessageClose = () => {
    setAppCreateMessageOpen(false);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Fragment>
      <PageHeader
        title="Apps"
        pageActions={<AppListPageActions onAppCreate={handleAppCreate} />}
      />
      {Boolean(apps.length) && <AppsList apps={apps} />}
      {error && <DokkuClientError error={error} />}
      <Snackbar
        open={appCreateMessageOpen}
        autoHideDuration={6000}
        onClose={handleAppCreateMessageClose}
      >
        <Alert onClose={handleAppCreateMessageClose} severity="success">
          New app successfully created.
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default Apps;
