const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  return res
    .status(error.statusCode)
    .json({ message: error.message, code: error.code })
}

module.exports = errorHandler
