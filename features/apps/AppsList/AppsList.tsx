import React from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import Link from '../../layout/Link/Link';

export interface AppsListProps {
  apps: string[];
}

export const AppsList: React.FunctionComponent<AppsListProps> = ({ apps }) => {
  return (
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
  );
};
