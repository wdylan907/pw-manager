const expect = require('expect.js')
const app = require('../app')
const User = require('../models/user')
const Session = require('../models/session')
const bcrypt = require('bcrypt')
const session = require('supertest-session')

describe('POST entry', () => {
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
    const res = await session(app).post('/entry').send({ label: 'test' })
    expect(res.statusCode).to.be(401)
  })

  it('posts an entry', async () => {
    const res = await authenticatedSession
      .post('/entry')
      .send({ label: 'test' })
    expect(res.statusCode).to.be(201)
    const user = await User.findOne({ username: 'testuser' })
    expect(user.vault.length).to.be(1)
    expect(user.vault[0].label).to.be('test')
  })

  after(async () => {
    await User.deleteMany({})
    await Session.deleteMany({})
  })
})
