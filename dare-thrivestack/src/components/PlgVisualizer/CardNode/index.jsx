import React, { useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

import Iconize from '../../Iconize'

import { actionSelect } from '../store'

function PlgVisualizerCardNodeRaw({
  hidden,
  type,
  name,
  value,
  error,
  active,
  uuid,
}) {
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
        `Current value for ${name} is ${value}. Change Value?`,
        value
      )
      if (newNodeValue !== value) {
        // TODO: Update
      }
    }
  }, [name, value, type])

  if (hidden || !type || !uuid) {
    return null
  }

  let variant = 'light'
  let variantClassName = ''
  if (select.value === uuid) {
    if (error) {
      variant = 'danger'
      variantClassName = 'bg-danger text-light'
    } else {
      variant = 'warning'
      variantClassName = ' bg-warning-subtle text-dark'
    }
  } else if (active) {
    if (error) {
      variant = 'outline-danger'
      variantClassName = ' bg-danger-subtle text-dark'
    } else {
      variant = 'outline-warning'
      variantClassName = 'bg-warning-subtle text-dark'
    }
  }

  return (
    <ButtonGroup size='sm' className={`rounded-0 ${variantClassName}`}>
      <Button
        variant={variant}
        data-card='plg'
        data-type={type}
        data-uuid={uuid}
        className={`rounded-0 text-truncate ${
          variant === 'light' ? 'border' : ''
        }`}
        title={name}
        onClick={onClickCb}
      >
        {name}
      </Button>
      {type === 'key' ? (
        <Button
          variant={variant}
          className={`rounded-0 flex-grow-0 flex-shrink-0 ${
            variant === 'light' ? 'border' : ''
          }`}
          onClick={onEditCb}
        >
          <Iconize>✏️</Iconize>
        </Button>
      ) : null}
    </ButtonGroup>
  )
}

const PlgVisualizerCardNode = React.memo(PlgVisualizerCardNodeRaw)

export default PlgVisualizerCardNode
