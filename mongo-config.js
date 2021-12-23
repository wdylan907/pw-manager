const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const mongoose = require('mongoose')

const mongoURI =
  'mongodb+srv://user2:user2@cluster0.tg9sg.mongodb.net/login4?retryWrites=true&w=majority'

const connect = () => {
  mongoose.connect(mongoURI, () => {
    console.log('connected to db')
  })
}

const store = new MongoDBStore({
  uri: mongoURI,
  collection: 'sessions',
})

module.exports = { connect, store }
