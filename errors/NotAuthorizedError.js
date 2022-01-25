class NotAuthorizedError extends Error {
  constructor() {
    super('not authorized')
    this.statusCode = 401
    this.name = 'NotAuthorizedError'
  }
}

module.exports = NotAuthorizedError
