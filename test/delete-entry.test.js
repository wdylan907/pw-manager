const expect = require('expect.js')
const app = require('../index')
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

  it('redirects to login if not logged in', async () => {
    const res = await session(app).delete('/entry')
    expect(res.statusCode).to.be(302)
    expect(res.text).to.be('Found. Redirecting to /login')
    expect(res.headers.location).to.be('/login')
  })

  it('deletes an entry', async () => {
    const user = await User.findOne({ username: 'testuser' })
    user.vault = [{ label: 'test' }]
    await user.save()
    const res = await authenticatedSession
      .delete('/entry')
      .send({ id: user.vault[0]._id.toString() })
    expect(res._body.vault.length).to.be(0)
  })

  after(async () => {
    await User.deleteMany({})
    await Session.deleteMany({})
  })
})
