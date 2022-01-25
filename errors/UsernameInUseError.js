class UsernameInUseError extends Error {
  constructor() {
    super('username in use')
    this.statusCode = 400
    this.name = 'UsernameInUseError'
  }
}

module.exports = UsernameInUseError
