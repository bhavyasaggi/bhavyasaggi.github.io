import { useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

import { actionSelect } from '../store'

export default function PlgVisualizerCardNode({ hidden, type, node }) {
  const select = useSelector((state) => state.plgVisualizer.select)

  const dispatch = useDispatch()

  const onClickCb = useCallback(
    (e) => {
      const { type: dataType, uuid: dataValue } = e.target.dataset
      dispatch(actionSelect({ type: dataType, value: dataValue }))
    },
    [dispatch]
  )

  const onEditCb = useCallback(() => {
    if (type === 'key') {
      // eslint-disable-next-line no-alert
      const newNodeValue = window.prompt(
        `Current value for ${node.name} is ${node.value}. Change Value?`,
        node.value
      )
      if (newNodeValue !== node.value) {
        // TODO: Update
      }
    }
  }, [node.name, node.value, type])

  if (hidden || !type || !node) {
    return null
  }

  let variant = 'outline-info'
  if (select.value === node.uuid) {
    if (node.error) {
      variant = 'danger'
    } else {
      variant = 'info'
    }
  } else if (node.active) {
    if (node.error) {
      variant = 'outline-danger'
    } else {
      variant = 'outline-warning'
    }
  }

  return (
    <ButtonGroup size='sm'>
      <Button
        variant={variant}
        data-card='plg'
        data-type={type}
        data-uuid={node.uuid}
        className='text-truncate'
        title={node.name}
        onClick={onClickCb}
      >
        {node.name}
      </Button>
      {type === 'key' ? (
        <Button variant='info' onClick={onEditCb}>
          ✏️
        </Button>
      ) : null}
    </ButtonGroup>
  )
}
