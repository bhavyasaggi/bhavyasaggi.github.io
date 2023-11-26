const mongoose = require('mongoose')

const schemaLog = new mongoose.Schema(
  {
    userId: { type: String, required: true, lowercase: true },
    timestamp: { type: Date, required: true },
    status: { type: Number, required: true },
    errorMsg: String,
    request: String,
    response: String,
  },
  {
    timeseries: {
      timeField: 'timestamp',
      metaField: 'userId',
    },
  }
)

const ModelLog = mongoose.model('Log', schemaLog)

module.exports = {
  ModelLog,
  mongoose,
}
