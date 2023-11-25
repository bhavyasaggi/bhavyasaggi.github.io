jest.mock('../src/mongoose.js')
const { ModelLog, mongoose } = require('../src/mongoose.js')
const DUMMY_LOGS = [
  {
    userId: 'test',
    timestamp: 12,
    request: '{}',
    response: '{}',
    status: 0,
    errorMsg: '',
  },
  {
    userId: 'test2',
    timestamp: 24,
    request: '{}',
    response: '{}',
    status: 0,
    errorMsg: '',
  },
  {
    userId: 'test',
    timestamp: 36,
    request: '{}',
    response: '{}',
    status: 1,
    errorMsg: 'Random Failure',
  },
  {
    userId: 'test3',
    timestamp: 48,
    request: '{}',
    response: '{}',
    status: 1,
    errorMsg: 'Random Failure',
  },
]
ModelLog.find.mockReturnValue(
  (function selfChain() {
    return {
      sort: selfChain,
      limit: selfChain,
      exec() {
        return Promise.resolve(DUMMY_LOGS)
      },
    }
  })()
)

const request = require('supertest')
const { app } = require('../src/express.js')

beforeEach(() => {
  jest
    .spyOn(ModelLog.prototype, 'save')
    .mockImplementation((data) => Promise.resolve(data))
})
afterEach(() => {
  jest.restoreAllMocks()
})

describe('/api/hello-world', () => {
  it('GET: No userId', async () => {
    const response = await request(app).get('/api/hello-world')

    expect(response.status).toBe(400)
  })
  it('GET: userId', async () => {
    const response = await request(app).get('/api/hello-world?userId=test')

    expect(response.status).toBe(200)
    expect(response.text).toBe('Hello World')
  })
})

describe('/api/logs', () => {
  it('GET', async () => {
    const response = await request(app).get('/api/logs')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('count')
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toMatchObject(
      DUMMY_LOGS.map((log) => ({
        ...log,
        request: JSON.parse(log.request),
        response: JSON.parse(log.response),
      }))
    )
  })
  // it('GET: Date Range', async () => {
  // })
})

describe('/', () => {
  it('GET: HTML', async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
    expect(response.type).toBe('text/html')
  })
})
