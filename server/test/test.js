const expect = require('expect.js')
const request = require('supertest')

it('expect works', function () {
  expect(1).to.be.ok()
})

describe('description is here', () => {
  it('works with arrow fns', () => {
    expect(1).to.be.ok()
  })
})

it('does an http request', async () => {
  const res = await request('https://jsonplaceholder.typicode.com').get(
    '/todos/1'
  )
  //console.log(res.body)
  expect(res).to.be.ok()
})
