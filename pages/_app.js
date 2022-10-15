import { useEffect } from 'react';
import { useRouter } from 'next/router';

import React from 'react';
import Head from 'next/head';
import Settings from '../utils/settings';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    let path = router.pathname.replace('/', '');

    if (!path) path = 'home';
    else if (path.startsWith('product')) path = 'shop';

    const link = document.getElementById(path);

    if (link) {
      link.style.fontWeight = 'bold';
      link.style.color = '#009679';
    }
  });

  return <>
    <Head>
      <title>{Settings.name}</title>
      <link rel="shortcut icon" href="/favicon.png" />
    </Head>

    <Component {...pageProps} />
  </>
}

export default MyApp
