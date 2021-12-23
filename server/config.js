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
  saveUninitialized: true,
  store: new MongoDBStore({
    uri: mongoURI,
    collection: 'sessions',
  }),
  cookie: {
    httpOnly: true,
    maxAge: 360000,
  },
}

const port = process.env.PORT

const clientURL = process.env.CLIENT_URL

module.exports = { connectToDB, sessionConfig, port, clientURL }
