import React, { useState, useCallback, useReducer } from 'react'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'

import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'

import Iconize from '@/components/Iconize'

import BeeLineIssue from '../BeeLineIssue'

import {
  useBeeLineWorkerCb,
  useBeeLineWorkerLoaded,
  useBeeLineWorkerRef,
} from '../provider'

function BeeLineIssueRenderer({ index, data, style }: any) {
  const { teamID, id, title, parentID, status, labels, priority, assignee } =
    data[index] || {}
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
      />
    </div>
  )
}

export default function BeeLineIssues({
  title = '',
  section: group = '',
}: {
  title?: string
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
  const workerLoaded = useBeeLineWorkerLoaded()
  const workerCb = useBeeLineWorkerCb()

  const loadNextPage = useCallback(() => {
    const workerObj = workerRef.current
    setLoadingMeta({ isNextPageLoading: true })
    return new Promise((resolve, reject) => {
      console.log('~~ WW_FETCH', { group, page })
      if (!workerObj) {
        reject(new Error('uninit worker'))
      }
      workerObj?.getTickets(
        { group, page: page + 1, limit: 10 },
        workerCb(({ pages, page: resPage, data, hasMore }: any) => {
          console.log('~~ WW_FETCHED', { pages, resPage, data: data.length })
          if (data && data.length) {
            setitems((prevList) => [...prevList, ...data])
            setLoadingMeta({
              page: resPage,
              hasNextPage: hasMore || resPage < pages,
              isNextPageLoading: false,
            })
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

  const loaderHeight = group ? 400 : 600

  return (
    <details open className='border-top border-bottom'>
      <Stack
        as='summary'
        direction='horizontal'
        gap={3}
        className='px-3 py-1 bg-secondary'
      >
        <Button
          size='sm'
          variant='outline-dark'
          className='rounded-lg'
          onClick={() => {
            return workerLoaded
              ? loadNextPage()
              : window.alert('Worker not Loaded')
          }}
        >
          <Iconize className='small'>📢</Iconize>
        </Button>
        <div className='small'>{title}</div>
      </Stack>
      <div className='position-relative'>
        {!items || !items.length ? (
          <div className='position-absolute top-0 bottom-0 left-0 right-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='38'
              height='38'
              viewBox='0 0 38 38'
              stroke='#fff'
            >
              <g fill='none' fill-rule='evenodd'>
                <g transform='translate(1 1)' stroke-width='2'>
                  <circle stroke-opacity='.5' cx='18' cy='18' r='18' />
                  <path d='M36 18c0-9.94-8.06-18-18-18'>
                    <animateTransform
                      attributeName='transform'
                      type='rotate'
                      from='0 18 18'
                      to='360 18 18'
                      dur='1s'
                      repeatCount='indefinite'
                    />
                  </path>
                </g>
              </g>
            </svg>
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
              height={loaderHeight}
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
    </details>
  )
}
