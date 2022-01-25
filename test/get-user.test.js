const expect = require('expect.js')
const app = require('../app')
const User = require('../models/user')
const Session = require('../models/session')
const bcrypt = require('bcrypt')
const session = require('supertest-session')

describe('DELETE entry', () => {
  before(async () => {
    await new User({
      username: 'testuser',
      passwordHash: await bcrypt.hash('password', 10),
    }).save()

    authenticatedSession = session(app)
    await authenticatedSession.post('/login').send({
      username: 'testuser',
      password: 'password',
    })
  })

  it('gives 401 if not logged in', async () => {
    const res = await session(app).get('/user')
    expect(res.statusCode).to.be(401)
  })

  it('returns user data if logged in', async () => {
    const res = await authenticatedSession.get('/user')
    expect(res.statusCode).to.be(200)
    expect(res._body.username).to.be('testuser')
  })

  after(async () => {
    await User.deleteMany({})
    await Session.deleteMany({})
  })
})
