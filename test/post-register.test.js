const expect = require('expect.js')
const app = require('../app')
const User = require('../models/user')
const Session = require('../models/session')
const session = require('supertest-session')

describe('POST register', () => {
  it('creates a user', async () => {
    const res = await session(app)
      .post('/register')
      .send({ username: 'testuser', password: 'password' })
    const user = await User.findOne({ username: 'testuser' })
    expect(user).to.be.ok
    expect(res.statusCode).to.be(201)
  })

  it('does not create user if username already in use', async () => {
    const res = await session(app)
      .post('/register')
      .send({ username: 'testuser', password: 'password' })
    const users = await User.find({})
    expect(users.length).to.be(1)
    expect(res.statusCode).to.be(400)
  })

  after(async () => {
    await User.deleteMany({})
    await Session.deleteMany({})
  })
})
