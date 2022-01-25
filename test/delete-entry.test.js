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

  it('does not delete if not logged in', async () => {
    let user = await User.findOne({ username: 'testuser' })
    user.vault = [{ label: 'test' }]
    await user.save()
    const res = await session(app).delete(
      `/entry/${user.vault[0]._id.toString()}`
    )
    expect(res.statusCode).to.be(401)
    user = await User.findOne({ username: 'testuser' })
    expect(user.vault.length).to.be(1)
  })

  it('deletes an entry', async () => {
    const user = await User.findOne({ username: 'testuser' })
    user.vault = [{ label: 'test' }]
    await user.save()
    const res = await authenticatedSession.delete(
      `/entry/${user.vault[0]._id.toString()}`
    )
    expect(res._body.vault.length).to.be(0)
  })

  after(async () => {
    await User.deleteMany({})
    await Session.deleteMany({})
  })
})
