const express = require('express')
const session = require('express-session')
const cors = require('cors')
const config = require('./config')
const router = require('./controllers/router')

config.connectToDB()

const app = express()
app.use(express.json())
app.use(cors())
app.use(session(config.sessionConfig))
app.use(router)

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`)
})
