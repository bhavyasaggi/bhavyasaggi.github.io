import * as Comlink from 'comlink'

import React, { useState, useTransition, useCallback } from 'react'

import { useBeeLineWorkerLoaded, useBeeLineWorkerRef } from '../provider'

export default function BeeLineSync() {
  const [isPending, startTransition] = useTransition()

  const [progress, setProgress] = useState(0)

  const workerRef = useBeeLineWorkerRef()
  const workerLoaded = useBeeLineWorkerLoaded()

  const fetchTickets = useCallback(async () => {
    const workerObj = workerRef.current
    const uriList = [...Array(10)].map(
      (_i, i) => `https://sfe-interview.hoppscotch.com/issues-${i + 1}.json`
    )
    console.log('>>', workerObj)
    await new Promise((resolve) => {
      workerObj?.fetchTicketsAbort(Comlink.proxy(resolve))
    })
    workerObj?.fetchTickets(
      uriList,
      Comlink.proxy((p: number) => {
        startTransition(() => {
          setProgress(Number(p.toFixed(4)))
        })
      })
    )
  }, [workerRef])

  return (
    <>
      <button
        type='button'
        onClick={() => {
          return workerLoaded
            ? fetchTickets()
            : window.alert('Worked not loaded.')
        }}
      >
        <span>Re-Sync </span>
        <span>{isPending ? '?' : ''}</span>
        <span>{progress}%</span>
      </button>
      <button type='button' onClick={() => {}}>
        Clear
      </button>
    </>
  )
}
