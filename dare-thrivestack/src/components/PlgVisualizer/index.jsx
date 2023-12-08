import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import PlgVisualizerDataGraph from './DataGraph'
import PlgVisualizerRollupList from './RollupList'
import PlgVisualizerFilter from './Filter'
import PlgVisualizerCardNodeList from './CardNodeList'
import PlgVisualizerCardEdges from './CardEdges'

import { colOrder, colTitle } from './utils'

export default function PlgVisualizer() {
  return (
    <div className='position-relative pt-1 pb-5'>
      <PlgVisualizerDataGraph />
      <Container fluid className='pt-1 pb-5'>
        <PlgVisualizerRollupList />
      </Container>
      <Container>
        <Row className='py-1'>
          {colOrder.map((colKey) => (
            <Col key={colKey} sm={{ span: 2 }}>
              <PlgVisualizerFilter
                filterKey={colKey}
                title={colTitle[colKey] || 'Column'}
              />
            </Col>
          ))}
        </Row>
        <Row className='py-1'>
          {colOrder.map((colKey) => (
            <Col key={colKey} sm={{ span: 2, offset: 0 }}>
              <PlgVisualizerCardNodeList nodeKey={colKey} />
            </Col>
          ))}
        </Row>
      </Container>
      <PlgVisualizerCardEdges />
    </div>
  )
}
