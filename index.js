const express = require('express')
const session = require('express-session')
const config = require('./config')
const router = require('./controllers/router')

config.connectToDB()

const app = express()

app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    store: config.mongoStore,
  })
)
app.use(express.json())
app.use(router)

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`)
})
