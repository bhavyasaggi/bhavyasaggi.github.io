/* eslint-disable react/jsx-props-no-spreading */
import '@/styles/globals.css'

import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'

import { store } from '@/store/redux'

export default function App(appProps: AppProps) {
  const { Component, pageProps } = appProps as any
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
