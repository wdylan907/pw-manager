class InvalidCredentialsError extends Error {
  constructor() {
    super('invalid credentials')
    this.statusCode = 401
    this.name = 'InvalidCredentialsError'
    this.code = 1
  }
}

module.exports = InvalidCredentialsError
