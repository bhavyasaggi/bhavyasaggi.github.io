import { useSelector } from 'react-redux'

import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'

import PlgVisualizerCardNode from '../CardNode'

export default function PlgVisualizerCardNodeList({ nodeKey }) {
  const filters = useSelector((state) => state.plgVisualizer.filter[nodeKey])
  const nodes = useSelector((state) => state.plgVisualizer.nodes[nodeKey])
  const nodeCount = useSelector(
    (state) => state.plgVisualizer.nodeCount[nodeKey]
  )

  const moreCount = Math.max(nodeCount - nodes.length, 0)

  const filteredNodes = nodes.filter(({ uuid }) =>
    filters && filters.length ? filters.includes(uuid) : true
  )

  return (
    <Stack gap={1} className='mx-3'>
      {filteredNodes.map((node) => (
        <PlgVisualizerCardNode
          key={node.uuid}
          type={nodeKey}
          name={node.name}
          value={node.value}
          uuid={node.uuid}
          error={node.error}
          active={Boolean(node.active)}
        />
      ))}
      {moreCount ? (
        <Badge bg='secondary' pill className='opacity-25'>
          +{nodeCount - filteredNodes.length} More
        </Badge>
      ) : null}
    </Stack>
  )
}
