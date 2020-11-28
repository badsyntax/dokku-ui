import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import React, { Fragment } from 'react';
import Link from '../components/Link/Link';
// import styles from '../styles/Home.module.css';

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
          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
        </Box>
      </Container>
    </Fragment>
  );
}
