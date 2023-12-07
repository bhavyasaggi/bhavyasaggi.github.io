import * as Comlink from 'comlink'

import React, { useState, useCallback } from 'react'

import { useBeeLineWorkerLoaded, useBeeLineWorkerRef } from '../provider'

export default function BeeLineIssues() {
  const [issues, setIssues] = useState([])

  const workerRef = useBeeLineWorkerRef()
  const workerLoaded = useBeeLineWorkerLoaded()

  const fetchTickets = useCallback(() => {
    const workerObj = workerRef.current
    workerObj?.getTickets(
      {},
      Comlink.proxy((issueList: any) => {
        setIssues(issueList)
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
            : window.alert('Worker not Loaded')
        }}
      >
        Update
      </button>
      <pre>
        {JSON.stringify(
          Array.isArray(issues) ? issues.slice(0, 10) : issues,
          null,
          2
        )}
      </pre>
    </>
  )
}
