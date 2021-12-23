const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  label: { type: String, required: true },
  fields: {
    type: Map,
    of: String,
    default: {},
  },
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = schema
