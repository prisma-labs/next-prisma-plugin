import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { css, Global } from '@emotion/core';
import Head from 'next/head';
import React from 'react';
import Layout from '../components/Layout';


const MyApp = ({ Component, pageProps }) => {
  return (
      <ThemeProvider>
        <Head>
          <title>Next.js 9.5 + Prisma</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <CSSReset />
        <Global
          styles={css`
            body {
              background-color: #f7fafc;
            }
          `}
        />
      </ThemeProvider>
  );
};

export default MyApp;
