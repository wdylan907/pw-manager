const express = require('express')
const session = require('express-session')
const cors = require('cors')
const config = require('./config')
const router = require('./controllers/router')

const { connectToDB, corsConfig, sessionConfig, port } = config

connectToDB()

const app = express()

app.use(express.json())
app.use(cors(corsConfig))
app.use(session(sessionConfig))
app.use(router)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
