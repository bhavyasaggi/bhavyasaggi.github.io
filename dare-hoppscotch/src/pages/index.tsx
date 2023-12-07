import Head from 'next/head'
import { Inter } from 'next/font/google'

import BeeLine from '@/components/BeeLine'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className={`${inter.className}`}>
        <BeeLine />
      </main>
    </>
  )
}
