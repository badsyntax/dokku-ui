import React, { Fragment, useEffect, useState } from 'react';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { PageHeader } from '../components/PageHeader/PageHeader';
import Link from '../components/Link/Link';
import { dokkuApi } from '../api/DokkuAPI';

const Apps: React.FunctionComponent = () => {
  const [apps, setApps] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    dokkuApi
      .getApps()
      .then(setApps)
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <Fragment>
      <PageHeader title="Apps" />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>App Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apps.map((app) => (
                <TableRow key={app}>
                  <TableCell component="th" scope="row">
                    <Link href={`/apps/${app}`}>{app}</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Fragment>
  );
};

export default Apps;
