require('dotenv').config()

const { app } = require('./src/express.js')
const { mongoose } = require('./src/mongoose.js')

const MONGO_URI = `mongodb+srv://${encodeURIComponent(
  process.env.MONGO_USERNAME
)}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${
  process.env.MONGO_HOSTNAME
}/?retryWrites=true&w=majority`

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const listener = app.listen(process.env.PORT || 3000, () => {})
