const unknownEndpoint = (req, res) => {
  throw new Error('unknown endpoint')
}

module.exports = unknownEndpoint
