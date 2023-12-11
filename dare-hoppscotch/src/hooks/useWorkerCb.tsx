import * as Comlink from 'comlink'

import { useCallback } from 'react'

export const workerCb = <T extends {}>(cb: T): T => {
  return Comlink.proxy(cb)
}

export function useWorkerCb() {
  const cb = useCallback(workerCb, [])
  return cb
}
