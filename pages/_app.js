import React from 'react';
import Head from 'next/head';
import Settings from '../utils/settings';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>{Settings.name}</title>
      <link rel="shortcut icon" href="/favicon.png" />
    </Head>

    <Component {...pageProps} />
  </>
}

export default MyApp
