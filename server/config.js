const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoURI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

mongoose.connect(mongoURI, () => {
  //console.log('connected to db')
})

const port = process.env.PORT

const clientURL = process.env.CLIENT_URL

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

const corsConfig = {
  credentials: true,
  origin: clientURL,
}

module.exports = {
  sessionConfig,
  port,
  corsConfig,
}
