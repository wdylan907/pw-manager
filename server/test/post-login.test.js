const expect = require('expect.js')
const request = require('supertest')
const { app } = require('../index')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const session = require('supertest-session')

describe('POST login', () => {
  let authenticatedSession

  before(async () => {
    const user = new User({
      username: 'testuser',
      passwordHash: await bcrypt.hash('password', 10),
    })
    await user.save()

    authenticatedSession = session(app)
    await authenticatedSession.post('/login').send({
      username: 'testuser',
      password: 'password',
    })
  })

  it('returns 401 when incorrect password given', async () => {
    const res = await request(app).post('/login').send({
      username: 'testuser',
      password: 'asdasd',
    })
    expect(res.statusCode).to.be(401)
    expect(JSON.parse(res.text).status).to.be(1)
  })

  it('returns 401 when invalid username given', async () => {
    const res = await request(app).post('/login').send({
      username: 'asdasdasd',
      password: 'asdasd',
    })
    expect(res.statusCode).to.be(401)
    expect(JSON.parse(res.text).status).to.be(1)
  })

  after(async () => {
    await User.deleteMany({})
    await authenticatedSession.post('/logout')
  })
})
