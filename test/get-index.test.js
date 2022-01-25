const expect = require('expect.js')
const app = require('../app')
const session = require('supertest-session')

describe('GET index', () => {
  it('sends string "index"', async () => {
    let res = await session(app).get('/')
    expect(res.statusCode).to.be(200)
    expect(res.text).to.be('index')
  })
})
