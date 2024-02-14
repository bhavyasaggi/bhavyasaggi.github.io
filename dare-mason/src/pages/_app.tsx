import '@mantine/core/styles.css'
import '@/styles/global.scss'

import { Inter } from 'next/font/google'
import Head from 'next/head'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import {
  ColorSchemeScript,
  MantineProvider,
  DEFAULT_THEME,
  createTheme,
  mergeMantineTheme,
} from '@mantine/core'

import { makeStore, AppStore } from '@/store/redux'

import type { AppProps } from 'next/app'

const inter = Inter({ subsets: ['latin'] })

const theme = createTheme({
  primaryColor: 'dark',
  fontFamily: inter.style.fontFamily,
  headings: { fontFamily: inter.style.fontFamily },
  cursorType: 'pointer',
  defaultRadius: '8px',
  components: {
    Accordion: {
      styles: {
        control: {
          padding: '4px',
        },
        content: {
          padding: '4px',
        },
        label: {
          padding: '4px',
        },
      },
    },
    Button: {
      styles: {
        inner: {
          justifyContent: 'space-between',
        },
      },
    },
  },
})

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
        <MantineProvider theme={mergeMantineTheme(DEFAULT_THEME, theme)}>
          <main id='root' className={inter.className}>
            <Component {...pageProps} />
          </main>
        </MantineProvider>
      </Provider>
    </>
  )
}
