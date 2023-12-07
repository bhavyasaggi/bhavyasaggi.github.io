import Head from 'next/head'

import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'

import PlgVisualizer from '../components/PlgVisualizer'

export default function Home() {
  return (
    <>
      <Head>
        <title>PLG Visualizer</title>
      </Head>
      <main
        className='position-relative min-vh-100 bg-light-subtle'
        style={{
          backgroundColor: '#fafafa',
          backgroundImage: 'radial-gradient(#f5f5f5 1px, #fafafa 1px)',
          backgroundSize: '8px 8px',
        }}
      >
        <Container fluid className='py-3'>
          <Badge variant='info' pill>
            Configuration Manager
          </Badge>
          <header className='display-6 fw-bold text-dark mb-3'>
            Visualize & Manage Configurations
          </header>
        </Container>
        <PlgVisualizer />
      </main>
    </>
  )
}
