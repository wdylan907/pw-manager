class NotAuthorizedError extends Error {
  constructor() {
    super('not authorized')
    this.statusCode = 401
    this.name = 'NotAuthorizedError'
    this.code = null
  }
}

module.exports = NotAuthorizedError
