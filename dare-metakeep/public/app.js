'use strict'

import React, {
  StrictMode,
  useRef,
  useState,
  useReducer,
  useCallback,
  useEffect,
} from 'react'
import ReactDOM from 'react-dom'

import {
  Container,
  Row,
  Col,
  Navbar,
  Card,
  Table,
  ToggleButtonGroup,
  ToggleButton,
  Form,
  InputGroup,
} from 'react-bootstrap'

import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  TimeScale,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { isValid, format, subDays } from 'date-fns'
import 'chartjs-adapter-date-fns'

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  TimeScale
)

export const QUERY_DATETIME = {
  LAST_24_HOURS: 'Last 24 Hours',
  LAST_7_DAYS: 'Last 7 days',
  CUSTOM_RANGE: 'Custom Range',
}

const isValidDate = (date) => isValid(new Date(date))

export function CardCount({ title, value, StatusComponent }) {
  return (
    <Card className='text-center'>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        {StatusComponent ? <StatusComponent /> : value || 0}
      </Card.Body>
    </Card>
  )
}

export function CardTimeseries({ title, value, StatusComponent }) {
  const dataCount = []
  const dataUsers = []
  const dataFailures = []
  ;(value || []).forEach(
    ({ timestamp, countTotal, countUsers, countFailures }) => {
      if (!isValidDate(timestamp)) {
        return
      }
      const datetimestamp = new Date(timestamp)
      dataCount.push({ x: datetimestamp, y: countTotal })
      dataUsers.push({ x: datetimestamp, y: countUsers })
      dataFailures.push({ x: datetimestamp, y: countFailures })
    }
  )

  return (
    <Card className='text-center'>
      <Card.Header>{title}</Card.Header>
      <Card.Body
        className='d-flex align-items-center justify-content-center'
        style={{
          height: '300px',
        }}
      >
        {StatusComponent ? (
          <StatusComponent />
        ) : (
          <Line
            data={{
              datasets: [
                {
                  label: 'Total Log Count',
                  data: dataCount,
                  backgroundColor: 'blue',
                  borderColor: 'blue',
                  tension: 0.1,
                },
                {
                  label: 'Distinct User Count',
                  data: dataUsers,
                  backgroundColor: 'green',
                  borderColor: 'green',
                  tension: 0.1,
                },
                {
                  label: 'Failure Log Count',
                  data: dataFailures,
                  backgroundColor: 'red',
                  borderColor: 'red',
                  tension: 0.1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: 'time',
                  time: {
                    minUnit: 'minute',
                  },
                },
                y: {},
              },
            }}
          />
        )}
      </Card.Body>
    </Card>
  )
}

export function CardTimetable({ title, value, StatusComponent }) {
  return (
    <Card>
      <Card.Header>{title}</Card.Header>
      {StatusComponent ? (
        <Card.Body
          className='d-flex align-items-center justify-content-center'
          style={{
            minHeight: '300px',
          }}
        >
          <StatusComponent />
        </Card.Body>
      ) : (
        <Table size='sm' responsive bordered striped hover>
          <thead>
            <tr>
              <td>#</td>
              <td>UserId</td>
              <td>timestamp</td>
              <td>Status</td>
              <td>Error Message</td>
              <td>Request</td>
              <td>Response</td>
            </tr>
          </thead>
          <tbody className='small'>
            {(value || []).map(
              (
                { key, userId, timestamp, status, errorMsg, request, response },
                idx
              ) => (
                <tr key={key || idx}>
                  <td>{idx + 1}</td>
                  <td>{userId}</td>
                  <td>
                    {isValidDate(timestamp) ? (
                      <time dateTime={timestamp}>
                        {format(
                          new Date(timestamp),
                          'MMM d, yyyy, h:mm:ss.SSS aaaa'
                        )}
                      </time>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{status === 0 ? 'Success' : 'Failure'}</td>
                  <td>{errorMsg || ''}</td>
                  <td>{JSON.stringify(request)}</td>
                  <td>{JSON.stringify(response)}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      )}
    </Card>
  )
}

export function FilterDateTime({
  queryDateTime,
  queryDateTimeFrom,
  queryDateTimeTo,
  updateDataMeta,
}) {
  const formRef = useRef(null)

  const formNoop = useCallback((formEvent) => {
    formEvent.preventDefault()
  }, [])
  const formAction = useCallback(() => {
    if (formRef.current) {
      const formData = Object.fromEntries(
        new FormData(formRef.current).entries()
      )
      const deltaDataMeta = {
        queryDateTime: formData.dType,
      }
      if (formData.dFrom) {
        deltaDataMeta.queryDateTimeFrom = new Date(formData.dFrom).getTime()
      }
      if (formData.dTo) {
        deltaDataMeta.queryDateTimeTo = new Date(formData.dTo).getTime()
      }
      updateDataMeta(deltaDataMeta)
    }
  }, [])

  const isDisabledDateTime = queryDateTime !== QUERY_DATETIME.CUSTOM_RANGE

  return (
    <Form
      ref={formRef}
      onChange={formAction}
      onSubmit={formNoop}
      onReset={formNoop}
      className='border rounded p-3'
    >
      <Row>
        <Col>
          <Row>
            <Col>
              <InputGroup>
                <InputGroup.Text>From</InputGroup.Text>
                <Form.Control
                  name='dFrom'
                  type='datetime-local'
                  value={
                    format(queryDateTimeFrom, 'yyyy-MM-dd') +
                    'T' +
                    format(queryDateTimeFrom, 'HH:mm')
                  }
                  disabled={isDisabledDateTime}
                  data-testid='dType-datetime-start'
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroup.Text>To</InputGroup.Text>
                <Form.Control
                  name='dTo'
                  type='datetime-local'
                  value={
                    format(queryDateTimeTo, 'yyyy-MM-dd') +
                    'T' +
                    format(queryDateTimeTo, 'HH:mm')
                  }
                  disabled={isDisabledDateTime}
                  data-testid='dType-datetime-end'
                />
              </InputGroup>
            </Col>
          </Row>
        </Col>
        <Col className='text-end'>
          <ToggleButtonGroup type='radio' name='dType' value={queryDateTime}>
            {Object.entries(QUERY_DATETIME).map(
              ([queryDateTimeKey, queryDateTimeValue]) => (
                <ToggleButton
                  key={queryDateTimeKey}
                  id={`dType-toggle-${queryDateTimeKey}`}
                  data-testid={`dType-${queryDateTimeKey}`}
                  value={queryDateTimeValue}
                >
                  {queryDateTimeValue}
                </ToggleButton>
              )
            )}
          </ToggleButtonGroup>
        </Col>
      </Row>
    </Form>
  )
}

// TODO: replace with useSWR
export function useFetch() {
  const fetchCb = useCallback((resource, options = {}) => {
    const abortController = new AbortController()
    const fetchPromise = () =>
      fetch(resource, { ...options, signal: abortController.signal })
    const fetchAbort = () => {
      abortController.abort()
    }
    return [fetchPromise, fetchAbort]
  }, [])
  return fetchCb
}

export const DEFAULT_DATA_SET = {}
export const DEFAULT_DATA_REDUCER = (prevMeta, deltaMeta) => {
  const nextMeta = { ...prevMeta, ...deltaMeta }
  if (prevMeta.queryDateTime !== nextMeta.queryDateTime) {
    const currentDateTime = new Date().getTime()
    switch (nextMeta.queryDateTime) {
      case QUERY_DATETIME.LAST_24_HOURS:
        nextMeta.queryDateTimeTo = currentDateTime
        nextMeta.queryDateTimeFrom = subDays(currentDateTime, 1).getTime()
        break
      case QUERY_DATETIME.LAST_7_DAYS:
        nextMeta.queryDateTimeTo = currentDateTime
        nextMeta.queryDateTimeFrom = subDays(currentDateTime, 7).getTime()
        break
      default:
        break
    }
  }
  if (nextMeta.queryDateTimeFrom > nextMeta.queryDateTimeTo) {
    window.alert('Mismatched TimeRange')
    return prevMeta
  }
  // TODO: deep compare
  return nextMeta
}
export const DEFAULT_DATA_META = DEFAULT_DATA_REDUCER(
  {
    isLoading: true,
    isError: false,
  },
  {
    queryDateTime: QUERY_DATETIME.LAST_24_HOURS,
    queryDateTimeFrom: new Date().getTime(),
    queryDateTimeTo: new Date().getTime(),
  }
)

export default function App() {
  // {count: {total, failures, users}, data: [...{userId, timestamp, status, errorMsg, request, response}]}
  const [dataset, setDataset] = useState(DEFAULT_DATA_SET)
  const [
    { isLoading, isError, queryDateTime, queryDateTimeFrom, queryDateTimeTo },
    updateDataMeta,
  ] = useReducer(DEFAULT_DATA_REDUCER, DEFAULT_DATA_META)

  const fetchCb = useFetch()
  useEffect(() => {
    updateDataMeta({ isLoading: true, isError: false })

    // TODO: Update with appropriate API Path
    const resource = new URL('/api/logs', window.location.origin)
    resource.searchParams.append('from', queryDateTimeFrom)
    resource.searchParams.append('to', queryDateTimeTo)

    const [fetchPromise, fetchAbort] = fetchCb(resource.toString())

    // TODO: Debounce
    fetchPromise()
      .then((res) => res.json())
      .then((data) => {
        setDataset(data)
        updateDataMeta({ isLoading: false, isError: false })
      })
      .catch(() => {
        setDataset(DEFAULT_DATA_SET)
        updateDataMeta({ isLoading: false, isError: true })
      })
    return () => {
      fetchAbort()
      updateDataMeta({ isLoading: false, isError: false })
    }
  }, [queryDateTimeFrom, queryDateTimeTo])

  let StatusComponent = null
  if (isLoading) {
    StatusComponent = () => '⏳'
  }
  if (isError) {
    StatusComponent = () => '⚠️'
  }
  if (!dataset || !dataset.data || !dataset.data.length) {
    StatusComponent = () => '⛔'
  }

  return (
    <>
      <Navbar variant='dark' bg='dark'>
        <Container>
          <Navbar.Brand as='header'>Hello World Log Visualizer</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className='py-3'>
        <Row>
          <Col>
            <FilterDateTime
              queryDateTime={queryDateTime}
              queryDateTimeFrom={queryDateTimeFrom}
              queryDateTimeTo={queryDateTimeTo}
              updateDataMeta={updateDataMeta}
            />
          </Col>
        </Row>
      </Container>
      <Container as='main' className='py-3'>
        <Row className='mb-3'>
          <Col>
            <CardCount
              title='Total Logs'
              value={dataset?.count?.total || 0}
              StatusComponent={StatusComponent}
            />
          </Col>
          <Col>
            <CardCount
              title='Total Users'
              value={dataset?.count?.users || 0}
              StatusComponent={StatusComponent}
            />
          </Col>
          <Col>
            <CardCount
              title='Total Failures'
              value={dataset?.count?.failures || 0}
              StatusComponent={StatusComponent}
            />
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col>
            <CardTimeseries
              title='Log Summary'
              value={dataset?.dataSummary}
              StatusComponent={StatusComponent}
            />
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col>
            <CardTimetable
              title='Logs'
              value={dataset.data}
              StatusComponent={StatusComponent}
            />
          </Col>
        </Row>
      </Container>
      <footer>
        <Container>
          <Row>
            <Col className='text-center'>Copyright</Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

// To bypass in jest env
if (typeof window !== 'undefined' && window.__ENV__) {
  ReactDOM.render(
    <StrictMode>
      <App />
    </StrictMode>,
    document.getElementById('main')
  )
}
