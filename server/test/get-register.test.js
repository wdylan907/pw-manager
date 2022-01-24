const expect = require('expect.js')
const app = require('../index')
const User = require('../models/user')
const Session = require('../models/session')
const bcrypt = require('bcrypt')
const session = require('supertest-session')

describe('GET login', () => {
  let authenticatedSession

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

  it('sends string "registration" when not logged in', async () => {
    const res = await session(app).get('/register')
    expect(res.statusCode).to.be(200)
    expect(res.text).to.be('registration')
  })

  it('redirects to index when logged in', async () => {
    let res = await authenticatedSession.get('/register')
    expect(res.statusCode).to.be(302)
    expect(res.text).to.be('Found. Redirecting to /')
    expect(res.headers.location).to.be('/')
  })

  after(async () => {
    await User.deleteMany({})
    await Session.deleteMany({})
  })
})
