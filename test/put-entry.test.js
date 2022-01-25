const expect = require('expect.js')
const app = require('../app')
const User = require('../models/user')
const Session = require('../models/session')
const bcrypt = require('bcrypt')
const session = require('supertest-session')

describe('PUT entry', () => {
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

  it('does not update entry if not logged in', async () => {
    let user = await User.findOne({ username: 'testuser' })
    user.vault = [{ label: 'test' }]
    await user.save()
    const res = await session(app)
      .put(`/entry/${user.vault[0]._id.toString()}`)
      .send({ label: 'updated' })
    user = await User.findOne({ username: 'testuser' })
    expect(user.vault[0].label).to.be('test')
    expect(res.statusCode).to.be(401)
  })

  it('updates an entry', async () => {
    let user = await User.findOne({ username: 'testuser' })
    user.vault = [{ label: 'test' }]
    await user.save()
    const res = await authenticatedSession
      .put(`/entry/${user.vault[0]._id.toString()}`)
      .send({ label: 'updated' })
    user = await User.findOne({ username: 'testuser' })
    expect(user.vault[0].label).to.be('updated')
    expect(res.statusCode).to.be(200)
  })

  after(async () => {
    await User.deleteMany({})
    await Session.deleteMany({})
  })
})
