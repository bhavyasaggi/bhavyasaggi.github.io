import React, { useState, useCallback, useReducer } from 'react'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'

import Spinner from 'react-bootstrap/Spinner'

import useChanged from '@/hooks/useChanged'
import { useWorkerCb } from '@/hooks/useWorkerCb'

import BeeLineIssue from '../BeeLineIssue'

import { useBeeLineWorkerRef, useBeeLineWorkerMeta } from '../provider'

function BeeLineIssueRenderer({ index, data, style }: any) {
  const {
    teamID,
    id,
    title,
    parentID,
    status,
    labels,
    priority,
    assignee,
    avatar,
  } = data[index] || {}
  if (!id) {
    return null
  }
  return (
    <div
      data-index={index}
      className='border-bottom p-2 bg-dark text-light'
      style={{ ...(style || ''), height: '50px', overflow: 'hidden' }}
    >
      <BeeLineIssue
        teamID={teamID}
        id={id}
        title={title}
        parentID={parentID}
        status={status}
        labels={labels}
        priority={priority}
        assignee={assignee}
        avatar={avatar}
      />
    </div>
  )
}

export default function BeeLineIssues({
  height = 400,
  section: group = '',
}: {
  height?: number
  section?: string
}) {
  const [
    { page = 0, hasNextPage = true, isNextPageLoading = false },
    setLoadingMeta,
  ] = useReducer(
    (prevMeta: any, nextMeta: any) => ({ ...prevMeta, ...nextMeta }),
    {}
  )

  const [items, setitems] = useState<any[]>([])

  const workerRef = useBeeLineWorkerRef()
  const { progress: workerProgress, loaded: workerLoaded } =
    useBeeLineWorkerMeta()

  const workerCb = useWorkerCb()

  const loadNextPage = useCallback(() => {
    const workerObj = workerRef
    setLoadingMeta({ isNextPageLoading: true })
    return new Promise((resolve, reject) => {
      // console.log('~~ WW_FETCH', { group, page })
      if (!workerObj) {
        reject(new Error('uninit worker'))
      }
      workerObj?.getTickets(
        { group, page: page + 1, limit: 10 },
        workerCb(({ pages, page: resPage, data, hasMore }: any) => {
          // console.log('~~ WW_FETCHED', { pages, resPage, data: data.length })
          if (data && data.length) {
            setitems((prevList) => [...prevList, ...data])
            setLoadingMeta({
              page: resPage,
              hasNextPage: hasMore || resPage < pages,
              isNextPageLoading: false,
            })
          } else {
            setLoadingMeta({ isNextPageLoading: false })
          }
          resolve(0)
        })
      )
    })
  }, [group, page, workerCb, workerRef])

  const itemCount = hasNextPage ? items.length + 1 : items.length
  const loadMoreItems =
    isNextPageLoading || !workerLoaded ? () => {} : loadNextPage
  const isItemLoaded = (index: number) => !hasNextPage || index < items.length

  const progressChanged = useChanged(workerProgress)
  if (progressChanged && items.length < 10) {
    loadMoreItems()
  }

  return (
    <div className='position-relative'>
      {!items || !items.length ? (
        <div className='position-absolute top-0 bottom-0 left-0 right-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark'>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      ) : null}
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }: any) => (
          <FixedSizeList
            className='List'
            height={height}
            itemCount={itemCount}
            itemData={items}
            itemSize={50}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {BeeLineIssueRenderer}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </div>
  )
}
