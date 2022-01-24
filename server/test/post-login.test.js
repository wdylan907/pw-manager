const expect = require('expect.js')
const app = require('../index')
const User = require('../models/user')
const Session = require('../models/session')
const bcrypt = require('bcrypt')
const session = require('supertest-session')

describe('POST login', () => {
  before(async () => {
    await new User({
      username: 'testuser',
      passwordHash: await bcrypt.hash('password', 10),
    }).save()
  })

  it('returns 401 when incorrect password given', async () => {
    const res = await session(app).post('/login').send({
      username: 'testuser',
      password: 'asdasd',
    })
    expect(res.statusCode).to.be(401)
    expect(JSON.parse(res.text).status).to.be(1)
  })

  it('returns 401 when invalid username given', async () => {
    const res = await session(app).post('/login').send({
      username: 'asdasdasd',
      password: 'asdasd',
    })
    expect(res.statusCode).to.be(401)
    expect(JSON.parse(res.text).status).to.be(1)
  })

  it('returns 200 when valid credentials given', async () => {
    const res = await session(app).post('/login').send({
      username: 'testuser',
      password: 'password',
    })
    expect(res.statusCode).to.be(200)
    expect(JSON.parse(res.text).status).to.be(0)
  })

  it('stores a session on login', async () => {
    await Session.deleteMany({})
    await session(app).post('/login').send({
      username: 'testuser',
      password: 'password',
    })
    const sessions = await Session.find({})
    expect(sessions.length).to.be(1)
    expect(sessions[0].toObject().session.username).to.be('testuser')
    expect(sessions[0].toObject().session.isAuth).to.be(true)
  })

  after(async () => {
    await User.deleteMany({})
    await Session.deleteMany({})
  })
})
