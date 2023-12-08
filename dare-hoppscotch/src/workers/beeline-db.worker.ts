/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import * as Comlink from 'comlink'
import debounce from 'lodash/debounce'

const idbEventTarget = new EventTarget()
const idbEventReady = new Event('ready')

let db: IDBDatabase | null = null
const idb = indexedDB.open('beeline', 1)
idb.addEventListener('upgradeneeded', (e: any) => {
  db = e.target.result as IDBDatabase
  if (!db.objectStoreNames.contains('tickets')) {
    const objStoreLocal = idb.result.createObjectStore('tickets', {
      keyPath: 'id',
      autoIncrement: false,
    })
    objStoreLocal.createIndex('id', 'id', { unique: true })
  }
})
idb.addEventListener('success', (e: any) => {
  db = e.target.result as IDBDatabase
  idbEventTarget.dispatchEvent(idbEventReady)
})
idb.addEventListener('blocked', () => {
  console.log('!! db blocked')
})
idb.addEventListener('error', (e) => {
  console.error(e)
})

function waitForReady(cb: Function) {
  return (...args: any) => {
    if (db) {
      console.log('!! db present')
      cb(...args)
    } else {
      console.log('!! db waiting')
      const lazyCb = () => {
        console.log('!! db available')
        cb(...args)
        idbEventTarget.removeEventListener('ready', lazyCb)
      }
      idbEventTarget.addEventListener('ready', lazyCb, {
        once: true,
        passive: true,
      })
    }
  }
}

function idbTicketsClear() {
  const objStoreClear = db
    ?.transaction('tickets', 'readwrite')
    .objectStore('tickets')

  return new Promise((resolve, reject) => {
    const objStoreClearReq = objStoreClear?.clear()
    objStoreClearReq?.addEventListener('success', resolve)
    objStoreClearReq?.addEventListener('error', reject)
  })
}

function idbTicketsAdd(data: any) {
  const objStore = db
    ?.transaction('tickets', 'readwrite')
    .objectStore('tickets')
  return new Promise((resolve, reject) => {
    const objStoreRequest = objStore?.put(data)
    objStoreRequest?.addEventListener('success', resolve)
    objStoreRequest?.addEventListener('error', reject)
  })
}

// function idbTicketsAddUnsafe(data: any) {
//   const objStore = db
//     ?.transaction('tickets', 'readwrite')
//     .objectStore('tickets')
//   const objStoreRequest = objStore?.put(data)
//   objStoreRequest?.addEventListener('error', console.error)
// }

async function idbTicketsGet(
  {
    // eslint-disable-next-line no-unused-vars
    groupBy,
    // eslint-disable-next-line no-unused-vars
    from,
    // eslint-disable-next-line no-unused-vars
    limit,
  }: {
    groupBy: string
    from: string
    limit: number
  },
  // eslint-disable-next-line no-unused-vars
  cb: (list: any[]) => void = () => {}
) {
  // TODO: Apply filter, GRAB DATA
  const objStore = db
    ?.transaction('tickets', 'readwrite')
    .objectStore('tickets')
  const objStoreCursor = objStore?.openCursor('tickets')
  const resultList: any[] = []
  objStoreCursor?.addEventListener('success', (event: any) => {
    const cursor: IDBCursorWithValue | null = event.target.result
    if (!cursor) {
      cb(resultList)
      return
    }
    resultList.push(cursor.value)
  })
}

let isIdbTicketsRunning = false
// TODO: Make Singleton, use abortcontroller
async function idbTickets(
  uriList: string[] = [],
  // eslint-disable-next-line no-unused-vars
  cb: (progress: number) => any = () => {}
) {
  if (isIdbTicketsRunning) {
    return
  }

  isIdbTicketsRunning = true

  await idbTicketsClear()

  let progress = 0
  const progressUnit = Number(100 / (uriList.length || 1))

  const cbDebounce = debounce(cb, 600, { maxWait: 3000 })
  for (const uri of uriList) {
    const res = await fetch(uri)
    const { tickets = [] } = await res.json()
    const progressUnitLocal = Number(progressUnit / (tickets.length || 1))
    for (const ticket of tickets) {
      await idbTicketsAdd(ticket)
      // idbTicketsAddUnsafe(ticket)
      progress += progressUnitLocal
      await cbDebounce(progress)
    }
    await cb(progress)
  }
  await cb(progress)
  isIdbTicketsRunning = false
}

const beelineDB = {
  idbTickets: waitForReady(idbTickets),
  idbTicketsGet: waitForReady(idbTicketsGet),
}

export interface BeeLineWorkerDB {
  idbTickets: typeof idbTickets
  idbTicketsGet: typeof idbTicketsGet
}

Comlink.expose(beelineDB)
