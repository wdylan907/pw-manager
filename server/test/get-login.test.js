const expect = require('expect.js')
const request = require('supertest')
const { app } = require('../index')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const session = require('supertest-session')

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

it('sends string "login" when not logged in', async () => {
  const res = await request(app).get('/login')
  expect(res.statusCode).to.be(200)
  expect(res.text).to.be('login')
})

it('redirects to index when logged in', async () => {
  let res = await authenticatedSession.get('/login')
  expect(res.statusCode).to.be(302)
  expect(res.text).to.be('Found. Redirecting to /')
  expect(res.headers.location).to.be('/')
})

after(async () => {
  await User.deleteMany({})
  await authenticatedSession.post('/logout')
})
