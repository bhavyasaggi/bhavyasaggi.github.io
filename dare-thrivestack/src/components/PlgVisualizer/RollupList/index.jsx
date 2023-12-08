import { useSelector } from 'react-redux'

import Stack from 'react-bootstrap/Stack'
import Table from 'react-bootstrap/Table'

import PlgVisualizerRollupCard from '../RollupCard'

import { colOrder, colTitle } from '../utils'

export default function PlgVisualizerRollupList() {
  const selectValue = useSelector((state) => state.plgVisualizer.select.value)
  const edges = useSelector((state) => state.plgVisualizer.edges)
  const keyNodes = useSelector((state) => state.plgVisualizer.nodes.key)

  const affectedKeyNodes = keyNodes.filter(
    ({ uuid, active, error }) => error && (active || selectValue === uuid)
  )
  const affectedKeyNodesUuid = affectedKeyNodes.map(({ uuid }) => uuid)
  const affectedEdges = edges.filter(({ key }) =>
    affectedKeyNodesUuid.includes(key)
  )

  return (
    <>
      <div className='text-dark-emphasis small fw-bold my-1'>
        Showing rollup status
      </div>
      <Stack direction='horizontal' gap='3'>
        <PlgVisualizerRollupCard
          title='Edge Failures'
          value={affectedEdges.length}
        >
          <Table size='sm'>
            <thead>
              <tr>
                {colOrder.map((colKey) => (
                  <th key={colKey}>{colTitle[colKey]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {affectedEdges.map((aEdge, aIdx) => (
                <tr key={aEdge.uuid || aIdx}>
                  {colOrder.map((colKey, colIdx) => (
                    <td key={colIdx}>{aEdge[colKey]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </PlgVisualizerRollupCard>
        <PlgVisualizerRollupCard
          title='Variable Failures'
          value={affectedKeyNodes.length}
        >
          <Table size='sm'>
            <thead>
              <tr>
                <td>Variable</td>
                <td>Value</td>
              </tr>
            </thead>
            <tbody>
              {affectedKeyNodes.map(({ uuid, name, value }) => (
                <tr key={uuid}>
                  <td>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </PlgVisualizerRollupCard>
      </Stack>
    </>
  )
}
