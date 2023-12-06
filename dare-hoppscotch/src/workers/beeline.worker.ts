/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import * as Comlink from 'comlink'

const idbEventTarget = new EventTarget()
const idbEventReady = new Event('ready')

let db: IDBDatabase | null = null
let objStore: IDBObjectStore | null = null
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
  objStore = db.transaction('tickets', 'readwrite').objectStore('tickets')
  idbEventTarget.dispatchEvent(idbEventReady)
})

function waitForReady(cb: Function) {
  return (...args: any) => {
    if (db && objStore) {
      cb(...args)
    } else {
      const lazyCb = () => {
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

let isSyncIssuesRunning = false
// TODO: Make Singleton, use abortcontroller
async function syncIssues(
  uriList: string[] = [],
  // eslint-disable-next-line no-unused-vars
  cb: (progress: number) => void = () => {}
) {
  if (!isSyncIssuesRunning) {
    isSyncIssuesRunning = true
    let progress = 0
    const progressUnit = Number((100 / (uriList.length || 1)).toFixed(2))
    for (const uri of uriList) {
      const res = await fetch(uri)
      const { tickets = [] } = await res.json()
      const progressUnitLocal = Number(
        (progressUnit / (tickets.length || 1)).toFixed(2)
      )
      tickets.forEach((ticket: any) => {
        const objStoreRequest = objStore?.add(ticket)
        objStoreRequest?.addEventListener('success', () => {
          progress += progressUnitLocal
        })
      })
      // progress += progressUnit
      cb(progress)
    }
    cb(progress)
    isSyncIssuesRunning = false
  }
}

async function getTickets(
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

const beeline = {
  syncIssues: waitForReady(syncIssues),
  getTickets: waitForReady(getTickets),
}

export interface BeeLineWorker {
  syncIssues: typeof syncIssues
  getTickets: typeof getTickets
}

Comlink.expose(beeline)
