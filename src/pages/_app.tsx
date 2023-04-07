import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import LoadingComponent from '@/components/loading/loading.component';

/*if (process.env.NODE_ENV !== 'production') {
  const mockServer = require("../mock-server/mock-server.js");
}*/

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Router.events.on('routeChangeStart', () => setLoading(true));
    Router.events.on('routeChangeComplete', () => setLoading(false));
    Router.events.on('routeChangeError', () => setLoading(false));
    return () => {
      Router.events.off('routeChangeStart', () => setLoading(true));
      Router.events.off('routeChangeComplete', () => setLoading(false));
      Router.events.off('routeChangeError', () => setLoading(false));
    };
  }, [Router.events]);

  return <SessionProvider session={pageProps.session}>
    {
      (loading)
      ?
      <LoadingComponent />
      :
      <Component {...pageProps} />
      
    }
  </SessionProvider>
}

export default appWithTranslation(App);