import * as Comlink from 'comlink'

import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
  MutableRefObject,
} from 'react'

import { BeeLineWorker } from '@/workers/beeline.worker'

const ContextBeeLineValue = createContext({})
const ContextBeeLineWorkerRef = createContext<
  MutableRefObject<Comlink.Remote<BeeLineWorker> | undefined>
>({ current: undefined })

export default function BeeLineProvider({ children }: { children: any }) {
  const workerRef = useRef<Worker>()
  const beeLineWorkerRef = useRef<Comlink.Remote<BeeLineWorker>>()

  const [workerLoaded, setWorkerLoaded] = useState(false)

  useEffect(() => {
    setWorkerLoaded(false)

    workerRef.current = new Worker(
      new URL('@/workers/beeline.worker', import.meta.url)
    )
    beeLineWorkerRef.current = Comlink.wrap<BeeLineWorker>(workerRef.current)
    setWorkerLoaded(true)

    return () => {
      workerRef.current?.terminate()
      // @ts-ignore
      beeLineWorkerRef.current?.terminate()
      setWorkerLoaded(false)
    }
  }, [])

  return (
    <ContextBeeLineWorkerRef.Provider value={beeLineWorkerRef}>
      <ContextBeeLineValue.Provider value={workerLoaded}>
        {children}
      </ContextBeeLineValue.Provider>
    </ContextBeeLineWorkerRef.Provider>
  )
}

export function useBeeLineWorkerRef() {
  const workerRef = useContext(ContextBeeLineWorkerRef)
  return workerRef
}

export function useBeeLineWorkerLoaded() {
  const workerLoaded = useContext(ContextBeeLineValue)
  return workerLoaded
}
