/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'
import '@/styles/scrollbar.css'

import Head from 'next/head'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'

import { Provider } from 'react-redux'

import Stack from 'react-bootstrap/Stack'

import Iconize from '@/components/Iconize'
import { store } from '@/store/redux'

import beeLineGroups from '@/constants/beeLineGroups.json'
import BeeLineProvider from '@/components/BeeLine/provider'

const gFont = Montserrat({ subsets: ['latin'] })

// Global context providers to avoid re-initialzation
function AppProvider({ children }: any) {
  return <BeeLineProvider>{children}</BeeLineProvider>
}

export default function App(appProps: AppProps) {
  const { Component, pageProps } = appProps as any
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Stack
        direction='horizontal'
        className={`min-vh-100 align-items-start bg-black text-white ${gFont.className}`}
      >
        <Stack className='sticky-top vh-100 border-end flex-grow-0 flex-shrink-0 bg-dark'>
          <ol className='mt-0 mb-auto list-unstyled flex-grow-0 flex-shrink-0'>
            <li className='m-1'>
              <Link
                href='/'
                className='d-inline-block link-dark text-decoration-none rounded p-1 bg-secondary'
              >
                <Iconize>🏠</Iconize>
              </Link>
            </li>
            <li className='m-1'>
              <Link
                href='/tracker'
                className='d-inline-block link-dark text-decoration-none rounded p-1 bg-secondary'
              >
                <Iconize>📊</Iconize>
              </Link>
            </li>
            <li className='m-1'>
              <Link
                href='https://github.com/bhavyasaggi/bhavyasaggi.github.io/tree/master/dare-thrivestack'
                className='d-inline-block link-dark text-decoration-none rounded p-1 bg-secondary'
                rel='noopener noreferrer'
                target='_blank'
              >
                <Iconize>⚙️</Iconize>
              </Link>
            </li>
          </ol>
          <ol className='mt-auto mb-0 list-unstyled flex-grow-0 flex-shrink-0'>
            {beeLineGroups.map((blg) => (
              <li key={blg.id} title={blg.displayName} className='m-1'>
                <Link
                  href={`/tracker/${blg.id}`}
                  className='d-inline-block link-dark text-decoration-none rounded p-1 bg-secondary'
                >
                  <Iconize>{blg.name}</Iconize>
                </Link>
              </li>
            ))}
          </ol>
        </Stack>
        <div className='min-vh-100 flex-grow-1 flex-shrink-0'>
          <Provider store={store}>
            <AppProvider>
              <Component {...pageProps} />
            </AppProvider>
          </Provider>
        </div>
      </Stack>
    </>
  )
}
