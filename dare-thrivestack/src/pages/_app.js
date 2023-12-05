/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Head from 'next/head'

import { Provider } from 'react-redux'

import { store } from '../store'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
