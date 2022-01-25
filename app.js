const express = require('express')
const session = require('express-session')
const cors = require('cors')
const mongoose = require('mongoose')

const errorHandler = require('./middleware/errorHandler')
const unknownEndpoint = require('./middleware/unknownEndpoint')
const deleteEntryRouter = require('./routes/delete-entry')
const getIndexRouter = require('./routes/get-index')
const getUserRouter = require('./routes/get-user')
const postEntryRouter = require('./routes/post-entry')
const postLoginRouter = require('./routes/post-login')
const postLogoutRouter = require('./routes/post-logout')
const postRegisterRouter = require('./routes/post-register')
const putEntryRouter = require('./routes/put-entry')

const { corsConfig, sessionConfig, mongoURI } = require('./config')

mongoose.connect(mongoURI)

const app = express()

app.use(express.json())
app.use(cors(corsConfig))
app.use(session(sessionConfig))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
}

app.use(getIndexRouter)
app.use(getUserRouter)
app.use(postEntryRouter)
app.use(putEntryRouter)
app.use(deleteEntryRouter)
app.use(postLoginRouter)
app.use(postLogoutRouter)
app.use(postRegisterRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
