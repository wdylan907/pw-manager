class UsernameInUseError extends Error {
  constructor() {
    super('username in use')
    this.statusCode = 400
    this.name = 'UsernameInUseError'
    this.code = 1
  }
}

module.exports = UsernameInUseError
