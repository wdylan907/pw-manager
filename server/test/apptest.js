const expect = require('expect.js')
const request = require('supertest')
const { app, server } = require('../index')

it('tests app', async () => {
  const res = await request(app).get('/login')
  //console.log(res)
  expect(res.text).to.be('login')
})

after(() => {
  server.close(ar)
})
