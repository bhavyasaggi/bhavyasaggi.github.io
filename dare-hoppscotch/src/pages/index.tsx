import Head from 'next/head'
import Link from 'next/link'
import { Inter } from 'next/font/google'

import Button from 'react-bootstrap/Button'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main
        className={`min-vh-100 d-flex align-items-center justify-content-center ${inter.className}`}
      >
        <div className='text-center'>
          <div className='display-1'>Welcome!</div>
          <Link href='/tracker'>
            <Button size='lg' variant='dark'>
              Visit Dashboard
            </Button>
          </Link>
        </div>
      </main>
    </>
  )
}
