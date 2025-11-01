require('dotenv').config()
const dns = require('dns')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// Basic Configuration
const port = process.env.PORT || 3000

const urlCache = {
  '/api/shorturl/1': 'https://www.freecodecamp.org',
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/public', express.static(`${process.cwd()}/public`))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

// Your first API endpoint
app.post('/api/shortUrl', function (req, res) {
  const errRes = { error: 'invalid url' }
  const url = new URL(req.body.url).toString()
  const shortUrl = Math.random().toString(36).slice(2)
  if (!url.startsWith('http')) {
    return res.json(errRes)
  }
  try {
    const isValidUrl = Boolean(new URL(url))
    urlCache[shortUrl] = url
    return res.json({ original_url: url, short_url: shortUrl })
  } catch (err) {
    return res.json(errRes)
  }
})

app.get('/api/shorturl/:shortUrl', function (req, res) {
  const shortUrl = req.params.shortUrl || ''
  if (shortUrl && Object.hasOwnProperty.call(urlCache, shortUrl)) {
    const url = urlCache[shortUrl]
    return res.redirect(url)
  }
})

app.listen(port, function () {})
