var express = require('express')
var multer = require('multer')
var cors = require('cors')
require('dotenv').config()

var app = express()
var upload = multer({ dest: 'uploads/' })

app.use(upload.single('upfile'))
app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.post('/api/fileanalyse', (req, res) => {
  const file = req.file
  if (!file) {
    return res.status(500).json({ error: 'No File' })
  }
  return res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  })
})

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
})
