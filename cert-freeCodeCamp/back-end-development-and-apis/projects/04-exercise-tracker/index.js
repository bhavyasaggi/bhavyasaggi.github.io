require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const schemaUser = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
})
const ModelUser = mongoose.model('User', schemaUser)

const schemaExercise = new mongoose.Schema({
  username: { type: String, required: true },
  description: String,
  duration: Number,
  date: Date,
})
const ModelExercise = mongoose.model('Exercise', schemaExercise)

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.post('/api/users/:_id/exercises', (req, res) => {
  const _id = req.params._id || ''
  if (_id) {
    ModelUser.findById(_id, (err, dataUser) => {
      if (err) {
        return res.json({ error: 'Invalid ID' })
      }
      const username = dataUser.username
      const description = req.body.description
      const duration = req.body.duration
      const date = req.body.date ? new Date(req.body.date) : new Date()
      const exercise = new ModelExercise({
        username,
        description,
        duration,
        date,
      })
      exercise.save((err, dataExercise) => {
        if (err) {
          return res.json({ error: 'Error saving exercise' })
        }
        return res.json({
          _id: dataUser._id,
          username: dataUser.username,
          description: dataExercise.description,
          duration: dataExercise.duration,
          date: dataExercise.date.toDateString(),
        })
      })
    })
  } else {
    return res.json({ error: 'No _id' })
  }
})

app.get('/api/users/:_id/logs', (req, res) => {
  const _id = req.params._id || ''
  if (_id) {
    ModelUser.findById(_id, (err, dataUser) => {
      if (err) {
        return res.json({ error: 'Invalid ID' })
      }
      const username = dataUser.username
      const from = req.query.from
      const to = req.query.to
      const limit = req.query.limit
      const rawQueryExercise = { username }
      if (from) {
        rawQueryExercise.date = { $gte: new Date(from) }
      }
      if (to) {
        rawQueryExercise.date = { $lte: new Date(to) }
      }
      const queryExercise = ModelExercise.find(rawQueryExercise)
      if (limit) {
        queryExercise.limit(limit)
      }
      queryExercise.exec((err, dataExercise) => {
        if (err) {
          return res.json({ error: 'Error getting exercises' })
        }
        const log = dataExercise.map((exerciseItem) => ({
          description: exerciseItem?.description,
          duration: exerciseItem?.duration,
          date: exerciseItem?.date?.toDateString(),
        }))
        return res.json({
          _id: dataUser._id,
          username: dataUser.username,
          count: log.length,
          log,
        })
      })
    })
  } else {
    return res.json({ error: 'No _id' })
  }
})

app.get('/api/users', (req, res) => {
  ModelUser.find({}, (err, data) => {
    if (err) {
      return res.json({ error: 'Error getting users' })
    }
    return res.json(data)
  })
})

app.post('/api/users', (req, res) => {
  const username = req.body.username || ''
  if (username) {
    const newUser = new ModelUser({ username })
    newUser.save((err, data) => {
      if (err) {
        return res.json({ error: err.toString() })
      }
      return res.json(data)
    })
  } else {
    return res.json({ error: 'No Username' })
  }
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

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
