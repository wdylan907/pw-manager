const mongoose = require('mongoose')

const schema = new mongoose.Schema({}, { strict: false })

module.exports = mongoose.model('Session', schema)
