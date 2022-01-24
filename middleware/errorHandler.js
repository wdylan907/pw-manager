const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.message === 'invalid credentials') {
    return res.status(401).json({ code: 1 })
  }

  if (error.message === 'username in use') {
    return res.status(400).json({ code: 1 })
  }

  if (error.message === 'unknown endpoint') {
    return res.status(404).json({ message: 'unknown endpoint' })
  }

  next(error)
}

module.exports = errorHandler
