import * as Comlink from 'comlink'

import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
  useMemo,
  useTransition,
} from 'react'

import { workerCb } from '@/hooks/useWorkerCb'

import { BeeLineWorker } from './worker'

const ContextBeeLineValue = createContext<{
  progress: number
  loaded: boolean
}>({ progress: 0, loaded: false })
const ContextBeeLineWorkerRef =
  createContext<Comlink.Remote<BeeLineWorker> | null>(null)

let globalProgress = 0
let globalWorker: Worker | null = null
let globalBeeLineWorker: Comlink.Remote<BeeLineWorker> | null = null

export default function BeeLineProvider({ children }: { children: any }) {
  const [, startTransition] = useTransition()

  const [progress, setProgress] = useState(0)
  const [workerLoaded, setWorkerLoaded] = useState(false)

  const fetchTickets = useCallback(async () => {
    const beeLineWorker = globalBeeLineWorker
    if (globalProgress > 0 && beeLineWorker) {
      return
    }
    const uriList = [...Array(10)].map(
      (_i, i) => `https://sfe-interview.hoppscotch.com/issues-${i + 1}.json`
    )
    await new Promise((resolve) => {
      beeLineWorker?.fetchTicketsAbort(workerCb(resolve))
    })
    beeLineWorker?.fetchTickets(
      uriList,
      workerCb((p: number) => {
        startTransition(() => {
          setProgress(Number(p.toFixed(4)))
        })
      })
    )
  }, [])

  const abortTickets = useCallback(async () => {
    const beeLineWorker = globalBeeLineWorker
    await new Promise((resolve) => {
      beeLineWorker?.fetchTicketsAbort(workerCb(resolve))
    })
  }, [])

  useEffect(() => {
    const domLoadedAction = () => {
      const beeLineWorker = globalBeeLineWorker
      if (beeLineWorker) {
        return
      }
      setWorkerLoaded(false)
      // Grab WebWorker Instances
      globalWorker = new Worker(new URL('./worker', import.meta.url))
      globalBeeLineWorker = Comlink.wrap<BeeLineWorker>(globalWorker)
      // Initialize Sync
      fetchTickets()
      setWorkerLoaded(true)
    }

    // To avoid effect from breaking in between
    setTimeout(domLoadedAction, 0)

    return () => {
      // Stop Sync
      abortTickets()
      // Terminate WebWorker Instances
      globalWorker?.terminate()
      globalWorker = null
      // @ts-ignore
      globalBeeLineWorker?.terminate()
      globalBeeLineWorker = null
      // Update Status?
      setWorkerLoaded(false)
    }
  }, [abortTickets, fetchTickets])

  useEffect(() => {
    globalProgress = progress
  }, [progress])

  const providerValue = useMemo(
    () => ({
      progress,
      loaded: workerLoaded,
    }),
    [progress, workerLoaded]
  )

  return (
    <ContextBeeLineWorkerRef.Provider value={globalBeeLineWorker}>
      <ContextBeeLineValue.Provider value={providerValue}>
        {children}
      </ContextBeeLineValue.Provider>
    </ContextBeeLineWorkerRef.Provider>
  )
}

export function useBeeLineWorkerRef() {
  const workerRef = useContext(ContextBeeLineWorkerRef)
  return workerRef
}

export function useBeeLineWorkerMeta() {
  const workerMeta = useContext(ContextBeeLineValue)
  return workerMeta
}
