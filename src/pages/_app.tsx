import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'

if (process.env.NODE_ENV !== 'production') {
  const mockServer = require("../mock-server/mock-server.js");
}

function App({ Component, pageProps }: AppProps) {
  return <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
  </SessionProvider>
}

export default appWithTranslation(App);