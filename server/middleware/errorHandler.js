const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.message === 'invalid credentials') {
    return res.status(401).json({ status: 1 })
  }

  if (error.message === 'username in use') {
    return res.status(400).json({ status: 1 })
  }

  next(error)
}

module.exports = errorHandler
