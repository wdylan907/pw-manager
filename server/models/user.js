const mongoose = require('mongoose')

// const entrySchema = new mongoose.Schema({
//   label: { type: String, required: true },
//   fields: {
//     type: Map,
//     of: String,
//     default: {},
//   },
// })

// const entrySchema = new mongoose.Schema({
//   label: { type: String, required: true },
//   username: String,
//   password: { type: String, required: true },
// })

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  vault: [
    {
      label: { type: String, required: true },
      username: String,
      password: { type: String },
    },
  ],
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

// entrySchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   },
// })

module.exports = mongoose.model('User', schema)
