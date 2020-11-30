import React, { Fragment } from 'react';
import { Box, Breadcrumbs, Typography } from '@material-ui/core';
import Head from 'next/head';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from '../Link/Link';
import { useStyles } from './styles';

export interface PageAction {
  title: string;
  action: () => void;
}

export interface PageHeaderProps {
  title: string;
  section?: {
    title: string;
    url: string;
  };
  pageActions?: React.ReactNode;
}

export const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
  title,
  section,
  pageActions,
}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Head>
        <title>Dokku UI - {title}</title>
      </Head>
      <Box mb={3} className={classes.root}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="default" />}
        >
          {section && (
            <Typography variant="h5" component={Link} href={section.url}>
              {section.title}
            </Typography>
          )}
          <Typography variant="h5">{title}</Typography>
        </Breadcrumbs>
        {pageActions || null}
      </Box>
    </Fragment>
  );
};
