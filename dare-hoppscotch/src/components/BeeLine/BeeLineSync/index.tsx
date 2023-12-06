import * as Comlink from 'comlink'

import React, { useRef, useState, useEffect } from 'react'

import { BeeLineWorker } from '@/workers/beeline.worker'

export default function BeeLineSync() {
  const workerRef = useRef<Worker>()
  const beeLineWorkerRef = useRef<Comlink.Remote<BeeLineWorker>>()

  const [progress, setProgress] = useState(0)
  const [workerLoaded, setWorkerLoaded] = useState(false)

  useEffect(() => {
    setWorkerLoaded(false)
    workerRef.current = new Worker('@/workers/beeline.worker', {
      type: 'module',
    })
    beeLineWorkerRef.current = Comlink.wrap<BeeLineWorker>(workerRef.current)
    setWorkerLoaded(true)

    return () => {
      workerRef.current?.terminate()
      // @ts-ignore
      beeLineWorkerRef.current?.terminate()
      setWorkerLoaded(false)
    }
  }, [])

  useEffect(() => {
    if (workerLoaded) {
      const beeLineWorkerObj = beeLineWorkerRef.current
      const uriList = [...Array(10)].map(
        (_i, i) => `https://sfe-interview.hoppscotch.com/issues-${i + 1}.json`
      )
      beeLineWorkerObj?.syncIssues(
        uriList,
        Comlink.proxy((p: number) => {
          setProgress(p)
        })
      )
    }
  }, [workerLoaded])

  return <div>Sync: {progress}%</div>
}
