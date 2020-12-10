import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';

export const cache = createCache({ key: 'css' });

const { extractCritical } = createEmotionServer(cache);

export default class MyDocument extends Document {
  render(): React.ReactElement {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="https://cdn.jsdelivr.net/gh/dokku/dokku@v0.21.4/docs/assets/favicons/apple-touch-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="https://cdn.jsdelivr.net/gh/dokku/dokku@v0.21.4/docs/assets/favicons/apple-touch-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="https://cdn.jsdelivr.net/gh/dokku/dokku@v0.21.4/docs/assets/favicons/apple-touch-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="https://cdn.jsdelivr.net/gh/dokku/dokku@v0.21.4/docs/assets/favicons/apple-touch-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="https://cdn.jsdelivr.net/gh/dokku/dokku@v0.21.4/docs/assets/favicons/apple-touch-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="https://cdn.jsdelivr.net/gh/dokku/dokku@v0.21.4/docs/assets/favicons/apple-touch-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="https://cdn.jsdelivr.net/gh/dokku/dokku@v0.21.4/docs/assets/favicons/apple-touch-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="https://cdn.jsdelivr.net/gh/dokku/dokku@v0.21.4/docs/assets/favicons/apple-touch-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://cdn.jsdelivr.net/gh/dokku/dokku@v0.21.4/docs/assets/favicons/apple-touch-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            href="https://cdn.jsdelivr.net/gh/dokku/dokku@v0.21.4/docs/assets/favicons/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="https://cdn.jsdelivr.net/gh/dokku/dokku@v0.21.4/docs/assets/favicons/android-chrome-192x192.png"
            sizes="192x192"
          />
          <link
            rel="icon"
            type="image/png"
            href="https://cdn.jsdelivr.net/gh/dokku/dokku@v0.21.4/docs/assets/favicons/favicon-96x96.png"
            sizes="96x96"
          />
          <link
            rel="icon"
            type="image/png"
            href="https://cdn.jsdelivr.net/gh/dokku/dokku@v0.21.4/docs/assets/favicons/favicon-16x16.png"
            sizes="16x16"
          />
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/styles/default.min.css"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const styles = extractCritical(initialProps.html);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
      <style
        key="emotion-style-tag"
        data-emotion-css={styles.ids.join(' ')}
        dangerouslySetInnerHTML={{ __html: styles.css }}
      />,
    ],
  };
};
