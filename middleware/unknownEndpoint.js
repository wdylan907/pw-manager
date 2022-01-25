const UnknownEndpointError = require('../errors/UnknownEndpointError')

const unknownEndpoint = (req, res) => {
  throw new UnknownEndpointError()
}

module.exports = unknownEndpoint
