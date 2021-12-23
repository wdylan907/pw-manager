if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI

const connectToDB = () => {
  mongoose.connect(mongoURI, () => {
    console.log('connected to db')
  })
}

const mongoStore = new MongoDBStore({
  uri: mongoURI,
  collection: 'sessions',
})

const port = process.env.PORT

const secret = process.env.SECRET

module.exports = { connectToDB, mongoStore, port, secret }
