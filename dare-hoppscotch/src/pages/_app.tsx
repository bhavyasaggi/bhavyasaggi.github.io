/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app'

import '@/styles/globals.css'

import Head from 'next/head'

import { Provider } from 'react-redux'

import { store } from '@/store/redux'

export default function App(appProps: AppProps) {
  const { Component, pageProps } = appProps as any
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
