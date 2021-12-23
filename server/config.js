const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoURI = process.env.MONGODB_URI

const connectToDB = () => {
  mongoose.connect(mongoURI, () => {
    console.log('connected to db')
  })
}

const sessionConfig = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoDBStore({
    uri: mongoURI,
    collection: 'sessions',
  }),
}

const port = process.env.PORT

module.exports = { connectToDB, sessionConfig, port }
