const unknownEndpoint = (req, res) => {
  throw new Error('unknown endpoint')
  // next(error)
  // res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = unknownEndpoint
