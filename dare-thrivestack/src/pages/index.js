import Head from 'next/head'
import { Inter } from 'next/font/google'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import PlgVisualizer from '@/components/PlgVisualizer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>PLG Visualizer</title>
      </Head>
      <div id='root' className={`${inter.className}`}>
        <Navbar expand='lg' className='bg-body-tertiary'>
          <Container>
            <Navbar.Brand href='/'>PLG Visualizer</Navbar.Brand>
            <Nav className='ms-auto'>
              <Nav.Link href='#'>Github</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <main className='min-vh-100'>
          <PlgVisualizer />
        </main>
        <footer>Copyright</footer>
      </div>
    </>
  )
}
