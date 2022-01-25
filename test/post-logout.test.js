const expect = require('expect.js')
const app = require('../app')
const User = require('../models/user')
const Session = require('../models/session')
const bcrypt = require('bcrypt')
const session = require('supertest-session')

describe('POST logout', () => {
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

  it('does not access protected route after logging out', async () => {
    await authenticatedSession.post('/logout')
    const res = await authenticatedSession.get('/user')
    expect(res.statusCode).to.be(401)
  })

  after(async () => {
    await User.deleteMany({})
    await Session.deleteMany({})
  })
})
