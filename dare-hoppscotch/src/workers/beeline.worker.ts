/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import * as Comlink from 'comlink'

//
const dataSinkTickets = new Map()
let dataListTickets: any = []
let dataGroupTickets: any = {}
const pushDataGroupTickets = ({ id, type, value }: any) => {
  const group = `${type}-${value}`.replace(/\s/, '').toLowerCase()
  dataGroupTickets[group] = dataGroupTickets[group] || []
  dataGroupTickets[group].push(id)
}
const addDataGroupTickets = (ticket: any) => {
  const { id, status, labels, priority, assignee } = ticket
  pushDataGroupTickets({ id, type: 'status', value: status })
  pushDataGroupTickets({ id, type: 'priority', value: priority })
  pushDataGroupTickets({ id, type: 'assignee', value: assignee ? 1 : 0 })
  ;(Array.isArray(labels) ? labels : [labels]).forEach((lbl) => {
    pushDataGroupTickets({ id, type: 'labels', value: lbl })
  })
}

//
let fetchTicketsAbortController: AbortController | null = null
async function fetchTickets(
  uriList: any[] = [],
  // eslint-disable-next-line no-unused-vars
  cb: (progress: number) => any = () => {}
) {
  // Short Circuit
  if (
    fetchTicketsAbortController &&
    !fetchTicketsAbortController.signal.aborted
  ) {
    return
  }

  fetchTicketsAbortController = new AbortController()

  dataSinkTickets.clear()
  dataListTickets = []
  dataGroupTickets = {}

  let progress = 0
  const progressUnit = Number(100 / (uriList.length || 1))

  try {
    if (fetchTicketsAbortController.signal.aborted) {
      throw new Error('Aborted')
    }
    for (const uri of uriList) {
      fetchTicketsAbortController = new AbortController()
      const res = await fetch(uri, {
        signal: fetchTicketsAbortController.signal,
      })
      const { tickets = [] } = await res.json()
      for (const ticket of tickets) {
        setTimeout(() => {
          dataSinkTickets.set(ticket.id, ticket)
          dataListTickets.push(ticket.id)
          addDataGroupTickets(ticket)
          // Schedule a debounced indexedDB Commit
        }, 0)
      }
      progress += progressUnit
      // Schedule a debounced indexedDB Commit
      await cb(progress)
    }
  } catch (err: any) {
    if (fetchTicketsAbortController?.signal.aborted) {
      // Manual Abortion
      progress *= -1
    } else if (err.message !== 'Aborted') {
      console.error(err)
    }
  }
  // Schedule a debounced indexedDB Commit
  await cb(progress)
  fetchTicketsAbortController = null
}

function fetchTicketsAbort(cb: Function) {
  if (fetchTicketsAbortController) {
    fetchTicketsAbortController.abort()
  }
  cb()
}

//
function getTickets(
  {
    group,
    page = 1,
    limit = 10,
  }: { group?: string; page?: number; limit?: number },
  cb: Function
) {
  const sourceArray = (group ? dataGroupTickets[group] : dataListTickets) || []
  const pages = Math.ceil(sourceArray.length / limit)
  const from = (page - 1) * limit
  const to = from + limit
  const returnArray = sourceArray
    .slice(from, to)
    .map((id: any) => dataSinkTickets.get(id))
  console.log({
    pages,
    page,
    limit,
    data: returnArray,
  })
  cb({
    pages,
    page,
    limit,
    data: returnArray,
  })
}

const beeline = {
  fetchTickets,
  getTickets,
  fetchTicketsAbort,
}

export interface BeeLineWorker {
  fetchTickets: typeof fetchTickets
  getTickets: typeof getTickets
  fetchTicketsAbort: typeof fetchTicketsAbort
}

Comlink.expose(beeline)
