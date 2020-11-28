/* eslint-disable @typescript-eslint/ban-ts-comment */
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import React, { Fragment } from 'react';
import Link from '../components/Link/Link';
import Button from '@material-ui/core/Button';

export default function Home(): React.ReactNode {
  return (
    <Fragment>
      <Head>
        <title>Dokku UI</title>
      </Head>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          {/* @ts-ignore */}
          <Button
            variant="contained"
            color="primary"
            component={Link}
            naked
            href="/"
          >
            Go to the main page
          </Button>
        </Box>
      </Container>
    </Fragment>
  );
}
