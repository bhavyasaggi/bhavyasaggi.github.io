/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Head from 'next/head'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'

import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'

import { Provider } from 'react-redux'

import Iconize from '../components/Iconize'

import { store } from '../store'

const gFont = Montserrat({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <div id='root' className={`${gFont.className}`}>
        <Stack direction='horizontal' className='position-relative'>
          <Stack
            className='sticky-top border-end px-1 py-3 bg-body flex-grow-0 flex-shrink-0 lead text-center'
            style={{ height: '100vh' }}
          >
            <aside>
              <Link href='/' className='link-dark text-decoration-none'>
                <Iconize>🏠</Iconize>
              </Link>
            </aside>
            <Stack as='nav' className='mt-auto flex-grow-0 flex-shrink-0'>
              <a href='#info' className='link-dark text-decoration-none'>
                <Iconize>🛈</Iconize>
              </a>
              <a
                href='#notifications'
                className='link-dark text-decoration-none'
              >
                <Iconize>✉</Iconize>
              </a>
              <a href='#link' className='link-dark text-decoration-none'>
                <Iconize>⛓</Iconize>
              </a>
            </Stack>
          </Stack>
          <Stack>
            <Container fluid className='py-2 border-bottom bg-body'>
              <Link
                href='/'
                className='text-decoration-none link-dark fw-bold small'
              >
                PLG Visualizer
              </Link>
            </Container>

            <main className='min-vh-100'>
              <Provider store={store}>
                <Component {...pageProps} />
              </Provider>
            </main>

            <footer className='px-5 py-3 border-top lead fw-bold text-end text-light bg-secondary'>
              ©
            </footer>
          </Stack>
        </Stack>
      </div>
    </>
  )
}
