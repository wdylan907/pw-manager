const express = require('express')
const session = require('express-session')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const unknownEndpoint = require('./middleware/unknownEndpoint')

const deleteEntryRouter = require('./routes/delete-entry')
const getIndexRouter = require('./routes/get-index')
const getLoginRouter = require('./routes/get-login')
const getRegisterRouter = require('./routes/get-register')
const getUserRouter = require('./routes/get-user')
const postEntryRouter = require('./routes/post-entry')
const postLoginRouter = require('./routes/post-login')
const postLogoutRouter = require('./routes/post-logout')
const postRegisterRouter = require('./routes/post-register')
const putEntryRouter = require('./routes/put-entry')

const { corsConfig, sessionConfig, port } = require('./config')

const app = express()

app.use(express.json())

app.use(cors(corsConfig))
app.use(session(sessionConfig))

app.use(deleteEntryRouter)
app.use(getIndexRouter)
app.use(getLoginRouter)
app.use(getRegisterRouter)
app.use(getUserRouter)
app.use(postEntryRouter)
app.use(postLoginRouter)
app.use(postLogoutRouter)
app.use(postRegisterRouter)
app.use(putEntryRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

module.exports = app
