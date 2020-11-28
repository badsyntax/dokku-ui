import React, { Fragment } from 'react';
import Head from 'next/head';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../theme/theme';
import { AppShell } from '../components/AppShell/AppShell';

export interface MyAppProps {
  Component: React.FunctionComponent | React.ComponentClass;
  pageProps: unknown;
}

const MyApp: React.FunctionComponent<MyAppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </ThemeProvider>
    </Fragment>
  );
};

export default MyApp;
