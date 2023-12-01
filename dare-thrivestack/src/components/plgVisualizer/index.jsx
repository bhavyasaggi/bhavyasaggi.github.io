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
    <div className='position-relative min-vh-100'>
      <PlgVisualizerDataGraph />
      <Container>
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
            <Col key={colKey} sm={{ span: 1, offset: 1 }}>
              <PlgVisualizerCardNodeList nodeKey={colKey} />
            </Col>
          ))}
        </Row>
      </Container>
      <PlgVisualizerCardEdges />
    </div>
  )
}
