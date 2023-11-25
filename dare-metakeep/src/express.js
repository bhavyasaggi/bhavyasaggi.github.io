const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const compression = require('compression')

const { ModelLog } = require('./mongoose.js')

const app = express()

app.use(helmet.dnsPrefetchControl())
app.use(helmet.frameguard())
app.use(helmet.hidePoweredBy())
app.use(helmet.hsts())
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())
app.use(helmet.originAgentCluster())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.xssFilter())
app.use(cors())
app.use(compression())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

const getMultiQueryParams = (queryParam, extraParams = []) => [
  ...new Set(
    (Array.isArray(queryParam)
      ? queryParam
      : String(queryParam || '').split(',')
    ).concat(extraParams)
  ),
]

app.get('/api/hello-world', (req, res) => {
  const userId = req.query.userId || ''
  if (userId) {
    const isSuccess = Math.random() > 0.2
    const payload = {
      userId,
      timestamp: new Date(),
      status: isSuccess ? 0 : 1,
      errorMsg: isSuccess ? undefined : 'Random Failure',
    }
    new ModelLog({
      ...payload,
      request: JSON.stringify({
        hostname: req.hostname,
        ip: req.ip,
        path: req.path,
        xhr: req.xhr,
        query: req.query,
        body: req.body,
      }),
      response: JSON.stringify(payload),
    })
      .save()
      .then(() => {
        return res.send('Hello World')
      })
      .catch((err) => {
        res.status(500).json({ error: String(err) })
      })
  } else {
    return res.status(400).json({ error: 'Missing userId' })
  }
})

app.get('/api/logs', (req, res) => {
  const userId = req.query.userId
  const queryFrom = parseInt(req.query.from, 10)
  const queryTo = parseInt(req.query.to, 10)
  const queryLimit = parseInt(req.query.limit, 10)
  // To filter aggregation on: total, failures, users
  // Not consumed currently
  const queryCount = getMultiQueryParams(req.query.count, ['total'])
  const rawQueryLog = {}
  if (userId) {
    rawQueryLog.userId = userId
  }
  if (queryFrom) {
    rawQueryLog.timestamp = rawQueryLog.timestamp || {}
    rawQueryLog.timestamp['$gte'] = new Date(queryFrom)
  }
  if (queryTo) {
    rawQueryLog.timestamp = rawQueryLog.timestamp || {}
    rawQueryLog.timestamp['$lte'] = new Date(queryTo)
  }
  const queryLog = ModelLog.find(rawQueryLog).sort('timestamp')
  if (queryLimit) {
    queryLog.limit(queryLimit)
  }
  queryLog
    .exec()
    .then((dataLog) => {
      let countTotal = 0
      let countFailures = 0
      const setUsers = new Set()
      const dataArray = (dataLog || []).map(
        ({ _id, userId, timestamp, request, response, status, errorMsg }) => {
          countTotal += 1
          countFailures += status
          setUsers.add(userId)
          return {
            key: _id || Math.random().toString(36).slice(2),
            userId,
            timestamp,
            request: JSON.parse(request),
            response: JSON.parse(response),
            status,
            errorMsg,
          }
        }
      )
      return res.json({
        count: {
          total: countTotal,
          failures: countFailures,
          users: setUsers.size,
        },
        data: dataArray,
      })
    })
    .catch((err) => {
      // TODO: Better Error messages
      return res.status(500).json({ error: String(err) })
    })
})

app.get('/status', (req, res) => {
  return res.json({
    status: 200,
    mongoReadyState: mongoose.connection.readyState,
  })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

module.exports = { app }
