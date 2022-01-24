const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoURI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

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
    sameSite: true,
    httpOnly: false,
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
  mongoURI,
}
