import '@mantine/core/styles.css'

import { Inter } from 'next/font/google'
import Head from 'next/head'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import {
  ColorSchemeScript,
  MantineProvider,
  DEFAULT_THEME,
} from '@mantine/core'

import { makeStore, AppStore } from '@/store/redux'

import type { AppProps } from 'next/app'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return (
    <>
      <Head>
        <title>Dare: Mason</title>
        <meta name='description' content='Dare for Mason' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <ColorSchemeScript />
      </Head>
      <Provider store={storeRef.current}>
        <MantineProvider theme={DEFAULT_THEME}>
          <div id='root' className={inter.className}>
            <Component {...pageProps} />
          </div>
        </MantineProvider>
      </Provider>
    </>
  )
}
