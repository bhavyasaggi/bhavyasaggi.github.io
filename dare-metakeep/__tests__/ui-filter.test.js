/**
 * @jest-environment jsdom
 */
import React, { useReducer } from 'react'
import { render, getByTestId, fireEvent, waitFor } from '@testing-library/react'

import { format, subDays } from 'date-fns'

import {
  FilterDateTime,
  DEFAULT_DATA_REDUCER,
  DEFAULT_DATA_META,
  QUERY_DATETIME,
} from '../public/app.js'

const inputFormatDateTime = (dt) =>
  format(dt, 'yyyy-MM-dd') + 'T' + format(dt, 'hh:mm')

function FilterDateTimeWrapper() {
  const [
    { queryDateTime, queryDateTimeFrom, queryDateTimeTo },
    updateDataMeta,
  ] = useReducer(DEFAULT_DATA_REDUCER, DEFAULT_DATA_META)
  return (
    <FilterDateTime
      queryDateTime={queryDateTime}
      queryDateTimeFrom={queryDateTimeFrom}
      queryDateTimeTo={queryDateTimeTo}
      updateDataMeta={updateDataMeta}
    />
  )
}

describe('Filter DateTime', () => {
  it('Initial', () => {
    const { getByTestId } = render(<FilterDateTimeWrapper />)
    waitFor(async () => {
      await expect(getByTestId('dType-LAST_24_HOURS')).toHaveProperty(
        'checked',
        true
      )
    })
  })
  it('Last 24 Hours', () => {
    const { getByTestId } = render(<FilterDateTimeWrapper />)
    fireEvent.click(getByTestId('dType-LAST_24_HOURS'))
    waitFor(async () => {
      await expect(getByTestId('dType-datetime-start')).toHaveProperty(
        'disabled',
        false
      )
      await expect(getByTestId('dType-datetime-end')).toHaveProperty(
        'disabled',
        false
      )
    })
    waitFor(async () => {
      const datetime = new Date()
      const datetimeEnd = inputFormatDateTime(datetime)
      const datetimeStart = inputFormatDateTime(subDays(datetime, 1))
      await expect(getByTestId('dType-datetime-end')).toHaveValue(datetimeEnd)
      await expect(getByTestId('dType-datetime-start')).toHaveValue(
        datetimeStart
      )
    })
  })
  it('Last 7 Days', () => {
    const { getByTestId } = render(<FilterDateTimeWrapper />)
    fireEvent.click(getByTestId('dType-LAST_7_DAYS'))
    waitFor(async () => {
      await expect(getByTestId('dType-datetime-start')).toHaveProperty(
        'disabled',
        false
      )
      await expect(getByTestId('dType-datetime-end')).toHaveProperty(
        'disabled',
        false
      )
    })
    waitFor(async () => {
      const datetime = new Date()
      const datetimeEnd = inputFormatDateTime(datetime)
      const datetimeStart = inputFormatDateTime(subDays(datetime, 7))
      await expect(getByTestId('dType-datetime-end')).toHaveValue(datetimeEnd)
      await expect(getByTestId('dType-datetime-start')).toHaveValue(
        datetimeStart
      )
    })
  })
  it('Custom Range: Start<End', () => {
    const { getByTestId } = render(<FilterDateTimeWrapper />)
    fireEvent.click(getByTestId('dType-CUSTOM_RANGE'))
    waitFor(async () => {
      await Promise.resolve()
    })
    waitFor(async () => {
      await expect(getByTestId('dType-datetime-start')).toHaveProperty(
        'disabled',
        false
      )
      await expect(getByTestId('dType-datetime-end')).toHaveProperty(
        'disabled',
        false
      )
    })
  })
})
