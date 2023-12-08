import React, { useState, useTransition, useCallback } from 'react'

import Stack from 'react-bootstrap/Stack'
import ProgressBar from 'react-bootstrap/ProgressBar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

import Iconize from '@/components/Iconize'

import {
  useBeeLineWorkerLoaded,
  useBeeLineWorkerRef,
  useBeeLineWorkerCb,
} from '../provider'

function BeeLineSyncRaw({ title = '' }: { title?: string }) {
  const [isPending, startTransition] = useTransition()

  const [progress, setProgress] = useState(0)

  const workerRef = useBeeLineWorkerRef()
  const workerLoaded = useBeeLineWorkerLoaded()
  const workerCb = useBeeLineWorkerCb()

  const fetchTickets = useCallback(async () => {
    const workerObj = workerRef.current
    const uriList = [...Array(10)].map(
      (_i, i) => `https://sfe-interview.hoppscotch.com/issues-${i + 1}.json`
    )
    await new Promise((resolve) => {
      workerObj?.fetchTicketsAbort(workerCb(resolve))
    })
    workerObj?.fetchTickets(
      uriList,
      workerCb((p: number) => {
        startTransition(() => {
          setProgress(Number(p.toFixed(4)))
        })
      })
    )
  }, [workerRef, workerCb])

  const abortTickets = useCallback(async () => {
    const workerObj = workerRef.current
    await new Promise((resolve) => {
      workerObj?.fetchTicketsAbort(workerCb(resolve))
    })
  }, [workerRef, workerCb])

  return (
    <Stack direction='horizontal' className='border-bottom p-3 text-end'>
      <div className='d-inline-block ms-0 me-auto lead'>{title}</div>
      <ButtonGroup size='sm' className='opacity-75'>
        <Button
          variant='secondary'
          onClick={() => {
            return workerLoaded
              ? fetchTickets()
              : window.alert('Worked not loaded.')
          }}
          style={{ width: '300px' }}
        >
          <span>{isPending ? '↻' : ''}</span>
          <span>{workerLoaded ? 'P' : 'A'}</span>

          <ProgressBar
            variant={progress < 0 ? 'danger' : 'dark'}
            min={0}
            max={100}
            now={Math.abs(progress)}
            label={`${Math.abs(progress)}%`}
            striped
          />
        </Button>
        <Button variant='dark' onClick={abortTickets}>
          <Iconize>🛑</Iconize>
        </Button>
      </ButtonGroup>
    </Stack>
  )
}

const BeeLineSync = React.memo(BeeLineSyncRaw)

export default BeeLineSync
