/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'

import Head from 'next/head'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'

import { Provider } from 'react-redux'

import Stack from 'react-bootstrap/Stack'

import Iconize from '@/components/Iconize'
import { store } from '@/store/redux'

import beeLineGroups from '@/constants/beeLineGroups.json'

const gFont = Montserrat({ subsets: ['latin'] })

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
            <Component {...pageProps} />
          </Provider>
        </div>
      </Stack>
    </>
  )
}
