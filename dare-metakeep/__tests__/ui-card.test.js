/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, waitFor } from '@testing-library/react'
import 'jest-canvas-mock'

import { CardCount, CardTimeseries, CardTimetable } from '../public/app.js'

const DUMMY_DATA = [
  {
    key: '6560d4c7f986db1c69532ab4',
    userId: '1',
    timestamp: '2023-11-24T16:52:23.168Z',
    request: {
      hostname: 'localhost',
      ip: '::1',
      path: '/api/hello-world',
      xhr: false,
      query: {
        userId: '1',
      },
      body: {},
    },
    response: {
      userId: '1',
      timestamp: '2023-11-24T16:52:23.168Z',
      status: 0,
    },
    status: 0,
  },
  {
    key: '6561020762eccd1e60d847df',
    userId: '1',
    timestamp: '2023-11-24T16:52:23.168Z',
    request: {
      hostname: 'localhost',
      ip: '::1',
      path: '/api/hello-world',
      xhr: false,
      query: {
        userId: '1',
      },
      body: {},
    },
    response: {
      userId: '1',
      timestamp: '2023-11-24T16:52:23.168Z',
      status: 0,
    },
    status: 1,
  },
  {
    key: '6560d4c9f986db1c69532ab6',
    userId: '2',
    timestamp: '2023-11-24T16:52:25.388Z',
    request: {
      hostname: 'localhost',
      ip: '::1',
      path: '/api/hello-world',
      xhr: false,
      query: {
        userId: '2',
      },
      body: {},
    },
    response: {
      userId: '2',
      timestamp: '2023-11-24T16:52:25.388Z',
      status: 1,
      errorMsg: 'Random Failure',
    },
    status: 1,
    errorMsg: 'Random Failure',
  },
  {
    key: '6560d4cbf986db1c69532ab8',
    userId: '3',
    timestamp: '2023-11-24T16:52:27.781Z',
    request: {
      hostname: 'localhost',
      ip: '::1',
      path: '/api/hello-world',
      xhr: false,
      query: {
        userId: '3',
      },
      body: {},
    },
    response: {
      userId: '3',
      timestamp: '2023-11-24T16:52:27.781Z',
      status: 0,
    },
    status: 0,
  },
]

const DUMMY_DATA_WRONG = JSON.parse(JSON.stringify(DUMMY_DATA)).map((datum) => {
  datum.timestamp = NaN
  return datum
})

beforeAll(() => {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserver
})
afterAll(() => {
  jest.clearAllMocks()
})

describe('CardCount', () => {
  it('Empty Data', () => {
    const { asFragment } = render(
      <CardCount title='Test Empty Render' value={0} />
    )
    waitFor(async () => {
      await expect(asFragment()).toMatchSnapshot()
    })
  })
  it('Dummy Data', () => {
    const { asFragment } = render(
      <CardCount title='Test Dummy Render' value={3} />
    )
    waitFor(async () => {
      await expect(asFragment()).toMatchSnapshot()
    })
  })
  it('Malformed Data', () => {
    const { asFragment } = render(
      <CardCount title='Test Malformed Render' value={NaN} />
    )
    waitFor(async () => {
      await expect(asFragment()).toMatchSnapshot()
    })
  })
  it('Loading State', () => {
    const { asFragment } = render(
      <CardCount
        title='Test Loading Render'
        value={NaN}
        StatusComponent={() => 'TRL'}
      />
    )
    waitFor(async () => {
      await expect(asFragment()).toMatchSnapshot()
    })
  })
  it('Error State', () => {
    const { asFragment } = render(
      <CardCount
        title='Test Error Render'
        value={NaN}
        StatusComponent={() => 'TRE'}
      />
    )
    waitFor(async () => {
      await expect(asFragment()).toMatchSnapshot()
    })
  })
})

describe('CardTimeseries', () => {
  it('Empty Data', () => {
    const { asFragment } = render(
      <CardTimeseries title='Test Empty Render' value={[]} />
    )
    waitFor(async () => {
      await expect(asFragment()).toMatchSnapshot()
    })
  })
  it('Dummy Data', () => {
    const { asFragment } = render(
      <CardTimeseries title='Test Dummy Render' value={DUMMY_DATA} />
    )
    waitFor(async () => {
      await expect(asFragment()).toMatchSnapshot()
    })
  })
  it('Malformed Data', () => {
    const { asFragment } = render(
      <CardTimeseries title='Test Malformed Render' value={DUMMY_DATA_WRONG} />
    )
    waitFor(async () => {
      await expect(asFragment()).toMatchSnapshot()
    })
  })
  it('Loading State', () => {
    const { asFragment } = render(
      <CardTimeseries
        title='Test Loading Render'
        value={NaN}
        StatusComponent={() => 'TRL'}
      />
    )
    waitFor(async () => {
      await expect(asFragment()).toMatchSnapshot()
    })
  })
  it('Error State', () => {
    const { asFragment } = render(
      <CardTimeseries
        title='Test Loading Render'
        value={NaN}
        StatusComponent={() => 'TRE'}
      />
    )
    waitFor(async () => {
      await expect(asFragment()).toMatchSnapshot()
    })
  })
})

describe('CardTimetable', () => {
  it('Empty Data', () => {
    const { asFragment } = render(
      <CardTimetable title='Test Empty Render' value={[]} />
    )
    waitFor(async () => {
      await expect(asFragment()).toMatchSnapshot()
    })
  })
  it('Dummy Data', () => {
    const { asFragment } = render(
      <CardTimetable title='Test Dummy Render' value={DUMMY_DATA} />
    )
    waitFor(async () => {
      await expect(asFragment()).toMatchSnapshot()
    })
  })
  it('Malformed Data', () => {
    const { asFragment } = render(
      <CardTimetable title='Test Malformed Render' value={DUMMY_DATA_WRONG} />
    )
    waitFor(async () => {
      await expect(asFragment()).toMatchSnapshot()
    })
  })
  it('Loading State', () => {
    const { asFragment } = render(
      <CardTimetable
        title='Test Loading Render'
        value={NaN}
        StatusComponent={() => 'TRL'}
      />
    )
    waitFor(async () => {
      await expect(asFragment()).toMatchSnapshot()
    })
  })
  it('Error State', () => {
    const { asFragment } = render(
      <CardTimetable
        title='Test Loading Render'
        value={NaN}
        StatusComponent={() => 'TRE'}
      />
    )
    waitFor(async () => {
      await expect(asFragment()).toMatchSnapshot()
    })
  })
})
