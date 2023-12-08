import React, { useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import { actionFilter } from '../store'

export default function PlgVisualizerFilter({ filterKey, title }) {
  const filters = useSelector((state) => state.plgVisualizer.filter[filterKey])
  const nodes = useSelector((state) => state.plgVisualizer.nodes[filterKey])

  const dispatch = useDispatch()

  // const onClickCb = useCallback(
  //   (e) => {
  //     const { value } = e.target.dataset
  //     if (value) {
  //       dispatch(actionFilter({ [filterKey]: value }))
  //     }
  //   },
  //   [dispatch, filterKey]
  // )

  const onSelectCb = useCallback(
    (e) => {
      const { value } = e.target
      if (value) {
        dispatch(actionFilter({ [filterKey]: value }))
        e.target.value = ''
      }
    },
    [dispatch, filterKey]
  )

  const onClearCb = useCallback(() => {
    dispatch(actionFilter({ [filterKey]: null }))
  }, [dispatch, filterKey])

  return (
    <InputGroup className='px-3 rounded-0'>
      <Form.Select size='sm' className='rounded-0' onChange={onSelectCb}>
        <option value='' hidden>
          {filters.length ? `(${filters.length}) ` : ''}
          {title}
        </option>
        {nodes.map((node) => (
          <option
            key={node.uuid}
            value={node.uuid}
            className={filters.includes(node.uuid) ? 'text-warning' : ''}
          >
            {node.name}
          </option>
        ))}
      </Form.Select>
      <Button
        size='sm'
        variant={filters && filters.length ? 'danger' : 'secondary'}
        disabled={!filters || !filters.length}
        className='rounded-0'
        onClick={onClearCb}
      >
        x
      </Button>
      {/*
        <div className='my-1 d-flex align-items-center gap-1 flex-wrap'>
        {nodes.map((node) =>
          filters && filters.length && filters.includes(node.uuid) ? (
            <ButtonGroup key={node.uuid} size='sm'>
              <Button variant='dark' disabled>
                {node.name}
              </Button>
              <Button variant='dark' data-value={node.uuid} onClick={onClickCb}>
                X
              </Button>
            </ButtonGroup>
          ) : null
        )}
      </div>
        */}
    </InputGroup>
  )
}
