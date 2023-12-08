import Head from 'next/head'

import BeeLine from '@/components/BeeLine'

export default function Home() {
  return (
    <>
      <Head>
        <title>Tracker Dashboard</title>
      </Head>
      <BeeLine title='Dashboard' />
    </>
  )
}
