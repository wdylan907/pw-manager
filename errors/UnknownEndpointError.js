class UnknownEndpointError extends Error {
  constructor() {
    super('unknown endpoint')
    this.statusCode = 404
    this.name = 'UnknownEndpointError'
  }
}

module.exports = UnknownEndpointError
